import { ethers } from "ethers";
import {
  WebAuthnWrapper,
  PassKeyKeyPair,
  PassKeySignature,
} from "../lib/webauth";
import { utils } from "@passwordless-id/webauthn";
import * as AccountUtils from "@opintents/shared";
import axios from "axios";

export class PreDeployedAccount {
  // bnbProvider: ethers.providers.JsonRpcProvider;
  opBnbProvider: ethers.providers.JsonRpcProvider;
  private client: WebAuthnWrapper;
  public accountFactory: string;
  private deployer: ethers.Signer;

  constructor() {
    // this.bnbProvider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.bnbchain.org:8545');
    // this.opBnbProvider = new ethers.providers.JsonRpcProvider('https://opbnb-testnet-rpc.bnbchain.org');
    this.opBnbProvider = new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/",
    );
    this.client = new WebAuthnWrapper();
    this.accountFactory = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    this.deployer = new ethers.Wallet(
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      this.opBnbProvider,
    );
  }

  getClient() {
    return this.client;
  }

  async register(username: string) {
    console.log("Registering user", username);
    // create passkey
    console.log("Creating Passkey pair");
    const passKeyPair = await this.client.registerPassKey(
      utils.randomChallenge(),
      username,
    );
    console.log(passKeyPair);
    // deploy account
    console.log("Deploying account");
    const address = await AccountUtils.deployAccount(
      this.accountFactory,
      this.deployer,
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
    return new AccountService(passKeyPair, address);
  }
}

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

export const getAccountService = async (address: string) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545/",
  );
  const passkey = await AccountUtils.getPassKeyFromAddress(address, provider);
  const pubKeyX = passkey.pubKeyX;
  const pubKeyY = passkey.pubKeyY;
  const keyId = passkey.keyId;
  const webauthn = new WebAuthnWrapper();
  const passKeyPair = new PassKeyKeyPair(keyId, pubKeyX, pubKeyY, webauthn);
  return new AccountService(passKeyPair, address);
};

export class AccountService {
  // bnbProvider: ethers.providers.JsonRpcProvider;
  opBnbProvider: ethers.providers.JsonRpcProvider;
  private client: PassKeyKeyPair;
  public address: string;
  public chainId: string;
  private deployer: ethers.Signer;

  constructor(passKeyPair: PassKeyKeyPair, address: string) {
    // this.bnbProvider = new ethers.providers.JsonRpcProvider('https://data-seed-prebsc-1-s1.bnbchain.org:8545');
    // this.opBnbProvider = new ethers.providers.JsonRpcProvider('https://opbnb-testnet-rpc.bnbchain.org');
    this.opBnbProvider = new ethers.providers.JsonRpcProvider(
      "http://127.0.0.1:8545/",
    );
    this.client = passKeyPair;
    this.address = address;
    this.chainId = "0x7a69";
    this.deployer = new ethers.Wallet(
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      this.opBnbProvider,
    );
  }

  async getBalance() {
    const balance = await this.opBnbProvider.getBalance(this.address);
    return balance;
  }

  async getPassKeyOwner() {
    const passKeyOwner = await AccountUtils.getPassKeyFromAddress(
      this.address,
      this.opBnbProvider,
    );
    return passKeyOwner;
  }

  async getAddressOwner() {
    const addressOwner = await AccountUtils.getAddressOwnerFromAddress(
      this.address,
      this.opBnbProvider,
    );
    return addressOwner;
  }

  // execute functions

  async execute(to: string, value: string, callData: string) {
    // get unsigned userOp
    const { userOp, userOpHash } = await AccountUtils.executeUnsignedUserOp(
      this.address,
      this.opBnbProvider,
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

  async sendEther(address: string, amount: string) {}
}