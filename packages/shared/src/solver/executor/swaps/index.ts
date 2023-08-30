import { ethers } from "ethers";
import axios from "axios";
// import BUSD from '../../../artifacts/contracts/aa/BUSD.sol/BUSD.json';
import Swapper from "../../../artifacts/contracts/aa/Swapper.sol/Swapper.json";
import Account from "../../../artifacts/contracts/aa/Account.sol/Account.json";

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");
const deployer = new ethers.Wallet(
  "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  provider,
);
// const BUSDContract = new ethers.Contract('0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', BUSD.abi, provider);
const SwapperContract = new ethers.Contract(
  "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
  Swapper.abi,
  deployer,
);
const chainId = "0x7a69";
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

const sendSignedUserOp = async (
  account: string,
  sender: ethers.Signer,
  userop: userOp,
) => {
  const AccountContract = new ethers.Contract(account, Account.abi, sender);
  const txRespnse = await AccountContract.entrypoint(userop);
  return txRespnse;
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
  // console.log("Packed user op is", packed);
  const enc = ethers.utils.defaultAbiCoder.encode(
    ["bytes32", "address", "uint256"],
    [ethers.utils.keccak256(packed), wallet, chainId],
  );
  return ethers.utils.keccak256(enc);
};

// export const swapBUSDToBNB = async (amountBUSD: string) => {

// }

export const swapBNBToBUSD = async (signedUserOp: userOp, account: string) => {
  // const price = await fetchBNBprice();
  // const amountBUSD = parseFloat(amountBNB)*price*0.9975
  // const swapperTx = await SwapperContract.populateTransaction.swapBNBToBUSD!(ethers.utils.parseEther(amountBNB), ethers.utils.parseEther(`${amountBUSD}`));
  // const swapperCallData = swapperTx.data;
  // const { userOp } = await executeUnsignedUserOp(
  //   account,
  //   provider,
  //   chainId,
  //   SwapperContract.address,
  //   amountBNB,
  //   swapperCallData!,
  // );
  // if(userOp.argument !== signedUserOp.argument){
  //   return null;
  // }
  // userOp.signature = signedUserOp.signature;
  const txResponse = await sendSignedUserOp(account, deployer, signedUserOp);
  return txResponse;
};

export const getSwapBUSDToBNBUserOP = async () => {};

export const getSwapBNBToBUSDUserOp = async (
  amountBNB: string,
  account: string,
) => {
  const price = await fetchBNBprice();
  const amountBUSD = parseFloat(amountBNB) * price * 0.9975;
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

// // swap to BNB
// export const swapBNB = async (amountBUSD: string) => {

// }

// swap to BUSD
export const simulateBUSDswapOnOpBNB = async (amountBNB: number) => {
  const price = await fetchBNBprice();
  const busdAmount = amountBNB * price;
  return busdAmount * 0.9985;
};

// swap to BNB
export const simulateBNBswapOnOpBNB = async (amountBUSD: number) => {
  const price = await fetchBNBprice();
  const bnbAmount = amountBUSD / price;
  return bnbAmount * 0.9985;
};
