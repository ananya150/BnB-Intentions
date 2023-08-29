// import { ethers } from "ethers";
import axios from "axios";

const fetchBNBprice = async () => {
  const response: any = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false&precision=2",
  );
  const price = response.data.binancecoin.usd;
  return price;
};

// // swap to BUSD
// export const swapBUSD = async (amountBNB: string) => {

// }

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
