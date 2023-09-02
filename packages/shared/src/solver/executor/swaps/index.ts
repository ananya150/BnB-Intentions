import { ethers } from "ethers";
import axios from "axios";
import BUSD from "../../../artifacts/contracts/aa/BUSD.sol/BUSD.json";
import Swapper from "../../../artifacts/contracts/aa/Swapper.sol/Swapper.json";
import Account from "../../../artifacts/contracts/aa/Account.sol/Account.json";

type userOp = {
  functionType: string;
  argument: string;
  nonce: string;
  signature: string;
};

const fetchBNBprice = async () => {
  const response: any = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false&precision=2",
  );
  const price = response.data.binancecoin.usd;
  return price;
};

const executeUnsignedUserOp = async (
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

const executeBatchUnsignedUserOp = async (
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

const getUnsignedUserOp = async (
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
  const enc = ethers.utils.defaultAbiCoder.encode(
    ["bytes32", "address", "uint256"],
    [ethers.utils.keccak256(packed), wallet, chainId],
  );
  return ethers.utils.keccak256(enc);
};

export const getSwapBUSDToBNBUserOP = async (
  amountBUSD: string,
  account: string,
  busdAddress: string,
  swapperAddress: string,
  chainId: string,
  provider: ethers.providers.JsonRpcProvider,
  deployer: ethers.Signer,
) => {
  const price = await fetchBNBprice();
  const amountBNB = (parseFloat(amountBUSD) / price) * 0.9975;
  const BUSDContract = new ethers.Contract(busdAddress, BUSD.abi, deployer);
  const to1 = BUSDContract.address;
  const value1 = ethers.utils.parseEther("0");
  const tx1data = await BUSDContract.populateTransaction.approve!(
    swapperAddress,
    ethers.utils.parseEther(amountBUSD),
  );
  const calldata1 = tx1data.data;

  const to2 = swapperAddress;
  const value2 = ethers.utils.parseEther("0");
  const SwapperContract = new ethers.Contract(
    swapperAddress,
    Swapper.abi,
    deployer,
  );
  const tx2data = await SwapperContract.populateTransaction.swapBUSDToBNB!(
    ethers.utils.parseEther(amountBUSD),
    ethers.utils.parseEther(`${amountBNB}`),
  );
  const calldata2 = tx2data.data;

  const tos = [to1, to2];
  const values = [value1, value2];
  const calldatas = [calldata1!, calldata2!];

  const { userOp, userOpHash } = await executeBatchUnsignedUserOp(
    account,
    provider,
    chainId,
    tos,
    values,
    calldatas,
  );
  return { userOp, userOpHash };
};

export const getSwapBNBToBUSDUserOp = async (
  amountBNB: string,
  account: string,
  swapperAddress: string,
  chainId: string,
  provider: ethers.providers.JsonRpcProvider,
  deployer: ethers.Signer,
) => {
  const price = await fetchBNBprice();
  const amountBUSD = parseFloat(amountBNB) * price * 0.9975;
  const SwapperContract = new ethers.Contract(
    swapperAddress,
    Swapper.abi,
    deployer,
  );
  const swapperTx = await SwapperContract.populateTransaction.swapBNBToBUSD!(
    ethers.utils.parseEther(amountBNB),
    ethers.utils.parseEther(`${amountBUSD}`),
  );
  const swapperCallData = swapperTx.data;
  const { userOp, userOpHash } = await executeUnsignedUserOp(
    account,
    provider,
    chainId,
    SwapperContract.address,
    amountBNB,
    swapperCallData!,
  );
  return { userOp, userOpHash };
};
