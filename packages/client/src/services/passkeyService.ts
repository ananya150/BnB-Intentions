import { BigNumber, ethers } from "ethers";
import {
  WebAuthnWrapper,
  PassKeyKeyPair,
  PassKeySignature,
} from "../lib/webauth";
import { utils } from "@passwordless-id/webauthn";
import * as AccountUtils from "@opintents/shared";
import axios from "axios";
import { addToWallet } from "../utils/setDb";

const OPBNB_PROVIDER = "https://opbnb-testnet-rpc.bnbchain.org/";
const BNB_PROVIDER = "https://bsc-testnet.publicnode.com/";
const ACCOUNT_FACTORY_ADDRESS = "0x60007BB13D30987731aDdDfD71c96DB61a9898eB";
const BUSD_ADDRESS = "0xEF55Fec437C65e12A796dCb79C076569971640e6";
const SWAPPER_ADDRESS = "0x780c98AB500ad0b42C29486C90a15FFC9adBd828";

// Pre Deployment Class for Account Setup and Deployment;
export class PreDeployedAccount {
  bnbProvider: ethers.providers.JsonRpcProvider;
  opBnbProvider: ethers.providers.JsonRpcProvider;
  private client: WebAuthnWrapper;
  public accountFactory: string;
  private opBnbDeployer: ethers.Signer;
  private bnbDeployer: ethers.Signer;

  constructor() {
    this.opBnbProvider = new ethers.providers.JsonRpcProvider(OPBNB_PROVIDER);
    this.bnbProvider = new ethers.providers.JsonRpcProvider(BNB_PROVIDER);
    this.client = new WebAuthnWrapper();
    this.accountFactory = ACCOUNT_FACTORY_ADDRESS;
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

  async register(username: string, id: string) {
    // create passkey
    console.log("Creating Passkey pair");
    const passKeyPair = await this.client.registerPassKey(
      utils.randomChallenge(),
      username,
    );
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
    if (address === null) {
      throw Error;
    }
    console.log(address);
    // save to db
    console.log("adding to db");
    const resp = await axios.post("/api/account/register", {
      address: address,
    });
    console.log(resp);
    // return AccountService
    return new OpBnbAccountService(passKeyPair, address);
  }
}

// Function to get passKey from address

export const getPassKey = async (address: string) => {
  const provider = new ethers.providers.JsonRpcProvider(BNB_PROVIDER);
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
  public swapperAddress: string;
  public transferProvider: ethers.providers.JsonRpcProvider;
  private transferDeployer: ethers.Signer;

  constructor(passKeyPair: PassKeyKeyPair, address: string) {
    this.provider = new ethers.providers.JsonRpcProvider(OPBNB_PROVIDER);
    this.transferProvider = new ethers.providers.JsonRpcProvider(BNB_PROVIDER);
    this.client = passKeyPair;
    this.address = address;
    this.chainId = "0x15eb";
    this.deployer = new ethers.Wallet(
      `${process.env.NEXT_PUBLIC_DEPLOYER}`,
      this.provider,
    );
    this.transferDeployer = new ethers.Wallet(
      `${process.env.NEXT_PUBLIC_DEPLOYER}`,
      this.transferProvider,
    );
    this.busdAddress = BUSD_ADDRESS;
    this.swapperAddress = SWAPPER_ADDRESS;
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
    const txResp = await AccountUtils.sendSignedUserOp(
      this.address,
      this.deployer,
      userOp,
    );
    return txResp;
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

  async swapBnBforBUSD(amountBNB: string) {
    const { userOp, userOpHash } = await AccountUtils.getSwapBNBToBUSDUserOp(
      amountBNB,
      this.address,
      this.swapperAddress,
      this.chainId,
      this.provider,
      this.deployer,
    );
    const signedUserOp = await this.signUserOp(userOp, userOpHash);
    const txResp = await this.sendUserOp(signedUserOp);
    return txResp;
  }

  async swapBUSDforBNB(amountBUSD: string) {
    const { userOp, userOpHash } = await AccountUtils.getSwapBUSDToBNBUserOP(
      amountBUSD,
      this.address,
      this.busdAddress,
      this.swapperAddress,
      this.chainId,
      this.provider,
      this.deployer,
    );
    const signedUserOp = await this.signUserOp(userOp, userOpHash);
    const txResp = await this.sendUserOp(signedUserOp);
    return txResp;
  }

  async bridgeFrom(amountBUSD: string) {
    try {
      await this.sendBUSD(
        "0xea7e50101aD33Cba51eB2730299942A6Fc9BaA6C",
        amountBUSD,
      );
    } catch (e) {
      return false;
    }
    await AccountUtils.getBUSD(
      `${parseFloat(amountBUSD) * 0.9975}`,
      this.address,
      this.busdAddress,
      this.transferDeployer,
    );
    return true;
  }

  async sendBNB(address: string, amount: string) {
    const txRespnse = await this.execute(address, amount, "0x");
    return txRespnse;
  }

  async sendBUSD(address: string, amount: string) {
    const calldata = await AccountUtils.getBUSDTransferCallData(
      this.busdAddress,
      this.provider,
      address,
      amount,
    );
    const txResponse = await this.execute(this.busdAddress, "0", calldata!);
    return txResponse;
  }
}

export class BnbAccountService {
  public provider: ethers.providers.JsonRpcProvider;
  public transferProvider: ethers.providers.JsonRpcProvider;
  private client: PassKeyKeyPair;
  public address: string;
  public chainId: string;
  private deployer: ethers.Signer;
  private transferDeployer: ethers.Signer;
  public busdAddress: string;
  public swapperAddress: string;

  constructor(passKeyPair: PassKeyKeyPair, address: string) {
    this.provider = new ethers.providers.JsonRpcProvider(BNB_PROVIDER);
    this.transferProvider = new ethers.providers.JsonRpcProvider(
      OPBNB_PROVIDER,
    );

    this.client = passKeyPair;
    this.address = address;
    this.chainId = "0x61";
    this.deployer = new ethers.Wallet(
      `${process.env.NEXT_PUBLIC_DEPLOYER}`,
      this.provider,
    );
    this.transferDeployer = new ethers.Wallet(
      `${process.env.NEXT_PUBLIC_DEPLOYER}`,
      this.transferProvider,
    );
    this.busdAddress = BUSD_ADDRESS;
    this.swapperAddress = SWAPPER_ADDRESS;
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
    const txResp = await AccountUtils.sendSignedUserOp(
      this.address,
      this.deployer,
      userOp,
    );
    return txResp;
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

  async swapBnBforBUSD(amountBNB: string) {
    const { userOp, userOpHash } = await AccountUtils.getSwapBNBToBUSDUserOp(
      amountBNB,
      this.address,
      this.swapperAddress,
      this.chainId,
      this.provider,
      this.deployer,
    );
    const signedUserOp = await this.signUserOp(userOp, userOpHash);
    const txResp = await this.sendUserOp(signedUserOp);
    return txResp;
  }

  async swapBUSDforBNB(amountBUSD: string) {
    const { userOp, userOpHash } = await AccountUtils.getSwapBUSDToBNBUserOP(
      amountBUSD,
      this.address,
      this.busdAddress,
      this.swapperAddress,
      this.chainId,
      this.provider,
      this.deployer,
    );
    const signedUserOp = await this.signUserOp(userOp, userOpHash);
    const txResp = await this.sendUserOp(signedUserOp);
    return txResp;
  }

  async bridgeFrom(amountBUSD: string) {
    try {
      await this.sendBUSD(
        "0xea7e50101aD33Cba51eB2730299942A6Fc9BaA6C",
        amountBUSD,
      );
    } catch (e) {
      return false;
    }
    await AccountUtils.getBUSD(
      `${parseFloat(amountBUSD) * 0.9975}`,
      this.address,
      this.busdAddress,
      this.transferDeployer,
    );
    return true;
  }

  async sendBNB(address: string, amount: string) {
    const txRespnse = await this.execute(address, amount, "0x");
    return txRespnse;
  }

  async sendBUSD(address: string, amount: string) {
    const calldata = await AccountUtils.getBUSDTransferCallData(
      this.busdAddress,
      this.provider,
      address,
      amount,
    );
    const txResp = await this.execute(this.busdAddress, "0", calldata!);
    return txResp;
  }
}
