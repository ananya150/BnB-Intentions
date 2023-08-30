import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Button } from "../ui/button";
import Image from "next/image";
import { TbArrowsExchange } from "react-icons/tb";
import { fetchTokens } from "../../redux/features/balanceSlice";
import { getAccountService } from "../../services/passkeyService";
import axios from "axios";
import { BiLoaderCircle } from "react-icons/bi";

const Swap = () => {
  const tokenList = useAppSelector((state) => state.tokens);
  const account = useAppSelector((state) => state.accountSlice);
  const dispatch = useAppDispatch();

  const [tokenOneAmount, setTokenOneAmount] = useState<any>(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState<any>(null);
  const [tokenOne, setTokenOne] = useState(tokenList.tokens[0]);
  const [tokenTwo, setTokenTwo] = useState(tokenList.tokens[1]);

  const [loading, setLoading] = useState(false);

  const _updatePrices = async () => {
    await dispatch(fetchTokens(tokenList.tokens));
  };

  const _updateBalance = async (accountService: any) => {
    const balances = await accountService.getBalances();
    await dispatch(fetchTokens(balances!));
  };

  const handleAmount1Change = (event: any) => {
    const inputValue = event.target.value;
    var sanitizedInput = inputValue.replace(/[^0-9.]/g, "");
    const parts = sanitizedInput.split(".");
    let decimalPart = parts[1] || "";
    if (decimalPart.length > 2) {
      console.log("trimming");
      sanitizedInput = sanitizedInput.slice(0, sanitizedInput.length - 1);
    }
    setTokenOneAmount(sanitizedInput);
    if (tokenOne.name === "BUSD") {
      console.log(tokenList.tokens[0].price);
      setTokenTwoAmount((sanitizedInput / tokenList.tokens[0].price) * 0.9975);
    } else {
      setTokenTwoAmount(sanitizedInput * tokenList.tokens[0].price * 0.9975);
    }
  };

  const handleAmount2Change = (event: any) => {
    const inputValue = event.target.value;
    var sanitizedInput = inputValue.replace(/[^0-9.]/g, "");
    const parts = sanitizedInput.split(".");
    let decimalPart = parts[1] || "";
    if (decimalPart.length > 2) {
      console.log("trimming");
      sanitizedInput = sanitizedInput.slice(0, sanitizedInput.length - 1);
    }
    setTokenTwoAmount(sanitizedInput);
    if (tokenTwo.name === "BUSD") {
      setTokenOneAmount(
        (sanitizedInput / tokenList.tokens[0].price / 0.9975).toFixed(2),
      );
    } else {
      setTokenOneAmount(
        ((sanitizedInput * tokenList.tokens[0].price) / 0.9975).toFixed(2),
      );
    }
  };

  const handleSwap = async () => {
    setLoading(true);
    try {
      const asset = tokenOne.name;
      const amount = tokenOneAmount;
      const accountAddr = account.address;
      const resp = await axios.post("/api/executor/swaps/getUserOp", {
        account: accountAddr,
        assetName: asset,
        amount,
      });
      console.log(resp.data);
      const accountService = getAccountService(
        account.address,
        account.pubKeyX,
        account.pubKeyY,
        account.keyId,
      );
      const signedUserOp = await accountService.signUserOp(
        resp.data.userOp,
        resp.data.userOpHash,
      );
      const txResp = await axios.post("/api/executor/swaps/sendUserOp", {
        assetName: asset,
        signedUserOp,
        account: account.address,
      });
      console.log(txResp);
      _updateBalance(accountService);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const exchange = () => {
    const tempTokenAmount = tokenOneAmount;
    setTokenOneAmount(tokenTwoAmount);
    setTokenTwoAmount(tempTokenAmount);
    if (tokenOne.name === "BNB") {
      setTokenOne(tokenList.tokens[1]);
      setTokenTwo(tokenList.tokens[0]);
    } else {
      setTokenOne(tokenList.tokens[0]);
      setTokenTwo(tokenList.tokens[1]);
    }
  };

  return (
    <div className="w-full h-full flex flex-col space-y-10 ">
      <div className="flex justify-between items-center px-8 py-5">
        <div className="text-white font-satoshi text-[30px] font-medium">
          Swap
        </div>
      </div>
      <div className="flex flex-col space-y-6 px-8 w-full relative">
        <div className="h-[200px] bg-[#32363E] flex rounded-2xl justify-between px-6 pt-5 pb-3">
          <div className="flex flex-col justify-between h-full">
            <div className="flex space-x-5 items-center">
              <div className="bg-white py-2 px-2 rounded-full">
                <Image
                  src={tokenOne.name === "BNB" ? "/Bnb2.png" : "/busd2.png"}
                  alt="token"
                  width={80}
                  height={80}
                  className="w-[35px] h-[35px]"
                />
              </div>
              <div className="text-[22px] text-gray-300 tracking-wide font-satoshi font-medium">
                {tokenOne.name}
              </div>
            </div>
            <div>
              <input
                onChange={handleAmount1Change}
                value={tokenOneAmount}
                autoFocus
                placeholder="0.00"
                className="h-[90px] outline outline-none w-1/2 text-[40px] px-4 bg-transparent text-white placeholder-gray-600"
              />
            </div>
          </div>
          <div className="flex flex-col justify-between  items-end h-full">
            <div
              onClick={() => {
                setTokenOneAmount(tokenOne.balance);
              }}
              className="text-white px-2 py-2 text-[20px] cursor-pointer"
            >
              MAX {tokenOne.balance}
            </div>
            <div className="text-gray-400 text-[25px] mb-2">
              ~ ${" "}
              {Number.isNaN(parseFloat(tokenOneAmount))
                ? "0.00"
                : (parseFloat(tokenOneAmount) * tokenOne.price).toFixed(4)}
            </div>
          </div>
        </div>
        <div
          onClick={exchange}
          className="absolute z-50 bg-[#32363E] py-2 px-2 rounded-full border-8 border-[#252831] top-[36%] left-[46%] cursor-pointer"
        >
          <TbArrowsExchange className="text-white w-12 h-12 rotate-90" />
        </div>
        <div className="h-[200px] bg-[#32363E] rounded-2xl flex justify-between px-6 pt-5 pb-3">
          <div className="flex flex-col justify-between h-full">
            <div className="flex space-x-5 items-center">
              <div className="bg-white py-2 px-2 rounded-full">
                <Image
                  src={tokenTwo.name === "BNB" ? "/Bnb2.png" : "/busd2.png"}
                  alt="token"
                  width={80}
                  height={80}
                  className="w-[35px] h-[35px]"
                />
              </div>
              <div className="text-[22px] text-gray-300 tracking-wide font-satoshi font-medium">
                {tokenTwo.name}
              </div>
            </div>
            <div>
              <input
                onChange={handleAmount2Change}
                value={tokenTwoAmount}
                placeholder="0.00"
                className="h-[90px] outline outline-none w-1/2 text-[40px] px-4 bg-transparent text-white placeholder-gray-600"
              />
            </div>
          </div>
          <div className="flex flex-col justify-between  h-full">
            <div></div>
            <div className="text-gray-400 text-[25px] mb-2">
              ~ ${" "}
              {Number.isNaN(parseFloat(tokenTwoAmount))
                ? "0.00"
                : (parseFloat(tokenTwoAmount) * tokenTwo.price).toFixed(4)}
            </div>
          </div>
        </div>
      </div>
      <div className="px-8 flex justify-center">
        {loading ? (
          <Button className="hover:bg-[#F3EF52] bg-[#F3EF52] rounded-2xl w-1/2 h-[100px] text-[30px] font-satoshi text-black font-medium ">
            <BiLoaderCircle className=" animate-spin w-9 h-9" />
          </Button>
        ) : (
          <Button
            onClick={handleSwap}
            className="hover:bg-[#F3EF52] bg-[#F3EF52] rounded-2xl w-1/2 h-[100px] text-[30px] font-satoshi text-black font-medium "
          >
            SWAP
          </Button>
        )}
      </div>
    </div>
  );
};

export default Swap;
