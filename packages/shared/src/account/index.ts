import { ethers } from "ethers";
import AccountFactory from "../artifacts/contracts/aa/AccountFactory.sol/AccountFactory.json";
import Account from "../artifacts/contracts/aa/Account.sol/Account.json";

export const deployAccount = async (
  accountFactory: string,
  deployer: ethers.Signer,
  pubKeyX: string,
  pubKeyY: string,
  keyId: string,
) => {
  const AccountFactoryContract: ethers.Contract = new ethers.Contract(
    accountFactory,
    AccountFactory.abi,
    deployer,
  );
  const expectedAddress = await AccountFactoryContract.getAddress(
    pubKeyX,
    pubKeyY,
    keyId,
    0,
  );
  try {
    await AccountFactoryContract.createAccount(pubKeyX, pubKeyY, keyId, 0);
    return expectedAddress;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getPassKeyFromAddress = async (
  account: string,
  provider: ethers.providers.JsonRpcProvider,
) => {
  const AccountContract = new ethers.Contract(account, Account.abi, provider);
  const passkeyowner = await AccountContract.getPassKeyOwner();
  return {
    pubKeyX: passkeyowner.pubKeyX,
    pubKeyY: passkeyowner.pubKeyY,
    keyId: passkeyowner.keyId,
  };
};
