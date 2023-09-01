import { BigNumber, ethers } from "ethers";
import {
  WebAuthnWrapper,
  PassKeyKeyPair,
  PassKeySignature,
} from "../lib/webauth";
import { utils } from "@passwordless-id/webauthn";
import * as AccountUtils from "@opintents/shared";
import axios from "axios";

// Pre Deployment Class for Account Setup and Deployment;
export class PreDeployedAccount {
  bnbProvider: ethers.providers.JsonRpcProvider;
  opBnbProvider: ethers.providers.JsonRpcProvider;
  private client: WebAuthnWrapper;
  public accountFactory: string;
  private opBnbDeployer: ethers.Signer;
  private bnbDeployer: ethers.Signer;

  constructor() {
    this.opBnbProvider = new ethers.providers.JsonRpcProvider(
      "https://opbnb-testnet-rpc.bnbchain.org/",
    );
    this.bnbProvider = new ethers.providers.JsonRpcProvider(
      "https://bsc-testnet.publicnode.com/",
    );
    this.client = new WebAuthnWrapper();
    this.accountFactory = "0x60007BB13D30987731aDdDfD71c96DB61a9898eB";
    this.opBnbDeployer = new ethers.Wallet(
      `${process.env.NEXT_PUBLIC_DEPLOYER}`,
      this.opBnbProvider,
    );
    this.bnbDeployer = new ethers.Wallet(
      `${process.env.NEXT_PUBLIC_DEPLOYER}`,
      this.bnbProvider,
    );
  }

  getClient() {
    return this.client;
  }

  async register(username: string) {
    try {
      console.log("Registering user", username);
      // create passkey
      console.log("Creating Passkey pair");
      const passKeyPair = await this.client.registerPassKey(
        utils.randomChallenge(),
        username,
      );
      console.log(passKeyPair);
      // deploy account on opBnB
      console.log("Deploying account");
      const address = await AccountUtils.deployAccount(
        this.accountFactory,
        this.opBnbDeployer,
        passKeyPair.pubKeyX._hex,
        passKeyPair.pubKeyY._hex,
        passKeyPair.keyId,
      );
      // deploy on bnb
      await AccountUtils.deployAccount(
        this.accountFactory,
        this.bnbDeployer,
        passKeyPair.pubKeyX._hex,
        passKeyPair.pubKeyY._hex,
        passKeyPair.keyId,
      );
      console.log(address);
      if (address === null) {
        return null;
      }
      // save to db
      console.log("adding to db");
      const response = await axios.post("/api/account/register", {
        address: address,
        keyId: passKeyPair.keyId,
        keyHash: passKeyPair.keyHash._hex,
      });
      console.log(response);
      if (response.status !== 200) {
        return null;
      }
      // return AccountService
      return new OpBnbAccountService(passKeyPair, address);
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

// Function to get passKey from address

export const getPassKey = async (address: string) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://bsc-testnet.publicnode.com/",
  );
  const { pubKeyX, pubKeyY, keyId } = await AccountUtils.getPassKeyFromAddress(
    address,
    provider,
  );
  return { pubKeyX, pubKeyY, keyId };
};

const encodeSignature = (signature: PassKeySignature) => {
  const encodedData = ethers.utils.defaultAbiCoder.encode(
    ["uint256", "uint256", "uint256", "bytes", "string", "string"],
    [
      signature.id,
      signature.r,
      signature.s,
      signature.authData,
      signature.clientDataPrefix,
      signature.clientDataSuffix,
    ],
  );
  return encodedData;
};

export const getAccountService = (
  address: string,
  pubKeyX: string,
  pubKeyY: string,
  keyId: string,
) => {
  const webauthn = new WebAuthnWrapper();
  const passKeyPair = new PassKeyKeyPair(
    keyId,
    ethers.BigNumber.from(pubKeyX),
    ethers.BigNumber.from(pubKeyY),
    webauthn,
  );
  const opBnbAccountService = new OpBnbAccountService(passKeyPair, address);
  const bnbAccountService = new BnbAccountService(passKeyPair, address);
  return { opBnbAccountService, bnbAccountService };
};

export class OpBnbAccountService {
  public provider: ethers.providers.JsonRpcProvider;
  private client: PassKeyKeyPair;
  public address: string;
  public chainId: string;
  private deployer: ethers.Signer;
  public busdAddress: string;

  constructor(passKeyPair: PassKeyKeyPair, address: string) {
    this.provider = new ethers.providers.JsonRpcProvider(
      "https://opbnb-testnet-rpc.bnbchain.org/",
    );

    this.client = passKeyPair;
    this.address = address;
    this.chainId = "0x15eb";
    this.deployer = new ethers.Wallet(
      `${process.env.NEXT_PUBLIC_DEPLOYER}`,
      this.provider,
    );
    this.busdAddress = "0xEF55Fec437C65e12A796dCb79C076569971640e6";
  }

  async getBalances() {
    const bnBbalance = await this.provider.getBalance(this.address);
    const busdBalance = await AccountUtils.getBUSDbalance(
      this.busdAddress,
      this.provider,
      this.address,
    );
    const tokens = [
      {
        name: "BNB",
        balance: parseInt(bnBbalance._hex, 16) / 10 ** 18,
        price: 0,
      },
      {
        name: "BUSD",
        balance: parseInt(busdBalance._hex, 16) / 10 ** 18,
        price: 1,
      },
    ];
    return tokens;
  }

  async getPassKeyOwner() {
    const passKeyOwner = await AccountUtils.getPassKeyFromAddress(
      this.address,
      this.provider,
    );
    return passKeyOwner;
  }

  async getAddressOwner() {
    const addressOwner = await AccountUtils.getAddressOwnerFromAddress(
      this.address,
      this.provider,
    );
    return addressOwner;
  }

  async airdrop() {
    await AccountUtils.airdrop(this.deployer, this.address, this.busdAddress);
  }

  async signUserOp(userOp: any, userOpHash: string) {
    const signature = await this.client.signChallenge(userOpHash);
    const encodedSig = encodeSignature(signature);
    userOp.signature = encodedSig;
    return userOp;
  }

  async sendUserOp(userOp: any) {
    await AccountUtils.sendSignedUserOp(this.address, this.deployer, userOp);
  }

  // execute functions

  async execute(to: string, value: string, callData: string) {
    // get unsigned userOp
    const { userOp, userOpHash } = await AccountUtils.executeUnsignedUserOp(
      this.address,
      this.provider,
      this.chainId,
      to,
      value,
      callData,
    );
    // sign the userOp hash
    const signature = await this.client.signChallenge(userOpHash);
    const encodedSig = encodeSignature(signature);
    userOp.signature = encodedSig;
    // send the signed userOp
    const txRespnse = await AccountUtils.sendSignedUserOp(
      this.address,
      this.deployer,
      userOp,
    );
    return txRespnse;
  }

  async executeBatch(tos: string[], values: string[], callDatas: string[]) {
    const valuesInWei = [];
    for (let i = 0; i < values.length; i++) {
      valuesInWei[i] = ethers.utils.parseEther(values[i]);
    }
    const { userOp, userOpHash } =
      await AccountUtils.executeBatchUnsignedUserOp(
        this.address,
        this.provider,
        this.chainId,
        tos,
        valuesInWei,
        callDatas,
      );
    const signature = await this.client.signChallenge(userOpHash);
    const encodedSig = encodeSignature(signature);
    userOp.signature = encodedSig;
    const txRespnse = await AccountUtils.sendSignedUserOp(
      this.address,
      this.deployer,
      userOp,
    );
    return txRespnse;
  }

  async sendBNB(address: string, amount: string) {
    await this.execute(address, amount, "0x");
  }

  async sendBUSD(address: string, amount: string) {
    const calldata = await AccountUtils.getBUSDTransferCallData(
      this.busdAddress,
      this.provider,
      address,
      amount,
    );
    await this.execute(this.busdAddress, "0", calldata!);
  }
}

export class BnbAccountService {
  public provider: ethers.providers.JsonRpcProvider;
  private client: PassKeyKeyPair;
  public address: string;
  public chainId: string;
  private deployer: ethers.Signer;
  public busdAddress: string;

  constructor(passKeyPair: PassKeyKeyPair, address: string) {
    this.provider = new ethers.providers.JsonRpcProvider(
      "https://bsc-testnet.publicnode.com/",
    );

    this.client = passKeyPair;
    this.address = address;
    this.chainId = "0x61";
    this.deployer = new ethers.Wallet(
      `${process.env.NEXT_PUBLIC_DEPLOYER}`,
      this.provider,
    );
    this.busdAddress = "0xEF55Fec437C65e12A796dCb79C076569971640e6";
  }

  async getBalances() {
    const bnBbalance = await this.provider.getBalance(this.address);
    const busdBalance = await AccountUtils.getBUSDbalance(
      this.busdAddress,
      this.provider,
      this.address,
    );
    const tokens = [
      {
        name: "BNB",
        balance: parseInt(bnBbalance._hex, 16) / 10 ** 18,
        price: 0,
      },
      {
        name: "BUSD",
        balance: parseInt(busdBalance._hex, 16) / 10 ** 18,
        price: 1,
      },
    ];
    return tokens;
  }

  async getPassKeyOwner() {
    const passKeyOwner = await AccountUtils.getPassKeyFromAddress(
      this.address,
      this.provider,
    );
    return passKeyOwner;
  }

  async getAddressOwner() {
    const addressOwner = await AccountUtils.getAddressOwnerFromAddress(
      this.address,
      this.provider,
    );
    return addressOwner;
  }

  async airdrop() {
    await AccountUtils.airdrop(this.deployer, this.address, this.busdAddress);
  }

  async signUserOp(userOp: any, userOpHash: string) {
    const signature = await this.client.signChallenge(userOpHash);
    const encodedSig = encodeSignature(signature);
    userOp.signature = encodedSig;
    return userOp;
  }

  async sendUserOp(userOp: any) {
    await AccountUtils.sendSignedUserOp(this.address, this.deployer, userOp);
  }

  // execute functions

  async execute(to: string, value: string, callData: string) {
    // get unsigned userOp
    const { userOp, userOpHash } = await AccountUtils.executeUnsignedUserOp(
      this.address,
      this.provider,
      this.chainId,
      to,
      value,
      callData,
    );
    // sign the userOp hash
    const signature = await this.client.signChallenge(userOpHash);
    const encodedSig = encodeSignature(signature);
    userOp.signature = encodedSig;
    // send the signed userOp
    const txRespnse = await AccountUtils.sendSignedUserOp(
      this.address,
      this.deployer,
      userOp,
    );
    return txRespnse;
  }

  async executeBatch(tos: string[], values: string[], callDatas: string[]) {
    const valuesInWei = [];
    for (let i = 0; i < values.length; i++) {
      valuesInWei[i] = ethers.utils.parseEther(values[i]);
    }
    const { userOp, userOpHash } =
      await AccountUtils.executeBatchUnsignedUserOp(
        this.address,
        this.provider,
        this.chainId,
        tos,
        valuesInWei,
        callDatas,
      );
    const signature = await this.client.signChallenge(userOpHash);
    const encodedSig = encodeSignature(signature);
    userOp.signature = encodedSig;
    const txRespnse = await AccountUtils.sendSignedUserOp(
      this.address,
      this.deployer,
      userOp,
    );
    return txRespnse;
  }

  async sendBNB(address: string, amount: string) {
    await this.execute(address, amount, "0x");
  }

  async sendBUSD(address: string, amount: string) {
    const calldata = await AccountUtils.getBUSDTransferCallData(
      this.busdAddress,
      this.provider,
      address,
      amount,
    );
    await this.execute(this.busdAddress, "0", calldata!);
  }
}
