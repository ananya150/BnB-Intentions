import { ethers } from "ethers";
import AccountFactory from "../artifacts/contracts/aa/AccountFactory.sol/AccountFactory.json";
import Account from "../artifacts/contracts/aa/Account.sol/Account.json";
import BUSD from "../artifacts/contracts/aa/BUSD.sol/BUSD.json";

type userOp = {
  functionType: string;
  argument: string;
  nonce: string;
  signature: string;
};

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
  console.log(passkeyowner);
  return {
    pubKeyX: passkeyowner.pubKeyX,
    pubKeyY: passkeyowner.pubKeyY,
    keyId: passkeyowner.keyId,
  };
};

export const getAddressOwnerFromAddress = async (
  account: string,
  provider: ethers.providers.JsonRpcProvider,
) => {
  const AccountContract = new ethers.Contract(account, Account.abi, provider);
  const addressOwner = await AccountContract.getAddressOwner();
  return addressOwner;
};

export const getUnsignedUserOp = async (
  functionType: string,
  argument: string,
  account: string,
  provider: ethers.providers.JsonRpcProvider,
) => {
  const AccountContract = new ethers.Contract(account, Account.abi, provider);
  const nonce = await AccountContract.getNonce();

  const UserOp: userOp = {
    functionType: functionType,
    argument: argument,
    nonce: nonce.toString(),
    signature: "0x",
  };

  return UserOp;
};

const getUserOpHash = (
  unsignedUserOp: userOp,
  wallet: string,
  chainId: string,
) => {
  const packed = ethers.utils.solidityPack(
    ["uint256", "bytes", "uint256"],
    [
      unsignedUserOp.functionType,
      ethers.utils.keccak256(unsignedUserOp.argument),
      unsignedUserOp.nonce,
    ],
  );
  // console.log("Packed user op is", packed);
  const enc = ethers.utils.defaultAbiCoder.encode(
    ["bytes32", "address", "uint256"],
    [ethers.utils.keccak256(packed), wallet, chainId],
  );
  return ethers.utils.keccak256(enc);
};

export const executeUnsignedUserOp = async (
  account: string,
  provider: ethers.providers.JsonRpcProvider,
  chainId: string,
  to: string,
  value: string,
  calldata: string,
) => {
  const argument = ethers.utils.defaultAbiCoder.encode(
    ["address", "uint256", "bytes"],
    [to, ethers.utils.parseEther(value), calldata],
  );
  const userOp = await getUnsignedUserOp("0", argument, account, provider);
  const userOpHash = getUserOpHash(userOp, account, chainId);
  return { userOp, userOpHash };
};

export const executeBatchUnsignedUserOp = async (
  account: string,
  provider: ethers.providers.JsonRpcProvider,
  chainId: string,
  tos: string[],
  values: ethers.BigNumber[],
  calldatas: string[],
) => {
  const argument = ethers.utils.defaultAbiCoder.encode(
    ["address[]", "uint256[]", "bytes[]"],
    [tos, values, calldatas],
  );
  const userOp = await getUnsignedUserOp("1", argument, account, provider);
  const userOpHash = await getUserOpHash(userOp, account, chainId);
  return { userOp, userOpHash };
};

export const sendSignedUserOp = async (
  account: string,
  sender: ethers.Signer,
  userop: userOp,
) => {
  const AccountContract = new ethers.Contract(account, Account.abi, sender);
  const txRespnse = await AccountContract.entrypoint(userop);
  return txRespnse;
};

export const getBUSDTransferCallData = async (
  busdAddress: string,
  provider: ethers.providers.JsonRpcProvider,
  to: string,
  amount: string,
) => {
  const BUSDContract = new ethers.Contract(busdAddress, BUSD.abi, provider);
  const tx = await BUSDContract.populateTransaction.transfer!(
    to,
    ethers.utils.parseUnits(amount, 18),
  );
  return tx.data;
};

export const getBUSDbalance = async (
  busdAddress: string,
  provider: ethers.providers.JsonRpcProvider,
  address: string,
) => {
  const BUSDContract = new ethers.Contract(busdAddress, BUSD.abi, provider);
  const balance = await BUSDContract.balanceOf(address);
  return balance;
};

export const airdrop = async (
  deployer: ethers.Signer,
  address: string,
  busdAddress: string,
) => {
  console.log("3");
  const bnbAmount = ethers.utils.parseEther("0.005");
  const busdAmount = ethers.utils.parseEther("20");
  console.log(bnbAmount);
  console.log(busdAmount);
  const tx = {
    to: address,
    value: bnbAmount,
  };
  await deployer.sendTransaction(tx);
  const BUSDContract = new ethers.Contract(busdAddress, BUSD.abi, deployer);
  await BUSDContract.transfer(address, busdAmount);
};

export const getBUSD = async (
  amount: string,
  address: string,
  busdAddress: string,
  deployer: ethers.Signer,
) => {
  console.log(amount);
  const busdAmount = ethers.utils.parseEther(amount);
  const BUSDContract = new ethers.Contract(busdAddress, BUSD.abi, deployer);
  await BUSDContract.transfer(address, busdAmount);
};
