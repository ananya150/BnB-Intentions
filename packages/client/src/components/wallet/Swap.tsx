import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Button } from "../ui/button";
import Image from "next/image";
import { TbArrowsExchange } from "react-icons/tb";
import {
  getAccountService,
  OpBnbAccountService,
  BnbAccountService,
} from "../../services/passkeyService";
import axios from "axios";
import { BiLoaderCircle } from "react-icons/bi";
import { switchToBNB, switchToOPBNB } from "../../redux/features/chainSlice";
import { fetchBnbTokens } from "../../redux/features/bnbBalanceSlice";
import { fetchOpBnbTokens } from "../../redux/features/opBnBbalanceSlice";
import { toast } from "react-hot-toast";

const Swap = () => {
  // const tokenList = useAppSelector((state) => state.tokens);
  const account = useAppSelector((state) => state.accountSlice);
  const dispatch = useAppDispatch();

  const opBnbTokens = useAppSelector((state) => state.opBnbTokens);
  const bnbTokens = useAppSelector((state) => state.bnbTokens);
  const chain = useAppSelector((state) => state.chainSlice);

  const [tokenOneAmount, setTokenOneAmount] = useState<any>(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState<any>(null);
  const [opBnBtokenOne, setOpBnBtokenOne] = useState(opBnbTokens.tokens[0]);
  const [opBnBtokenTwo, setOpBnBtokenTwo] = useState(opBnbTokens.tokens[1]);
  const [bnBtokenOne, setBnBtokenOne] = useState(bnbTokens.tokens[0]);
  const [bnBtokenTwo, setBnBtokenTwo] = useState(bnbTokens.tokens[1]);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [accountServices, setAccountServices] = useState<accounts | null>(null);

  const [loading, setLoading] = useState(false);

  interface accounts {
    opBnbAccountService: OpBnbAccountService;
    bnbAccountService: BnbAccountService;
  }

  useEffect(() => {
    const services: accounts = getAccountService(
      account.address,
      account.pubKeyX,
      account.pubKeyY,
      account.keyId,
    );
    setAccountServices(services);
  }, []);

  // const _updatePrices = async () => {
  //   await dispatch(fetchTokens(tokenList.tokens));
  // };

  // const _updateBalance = async (accountService: any) => {
  //   const balances = await accountService.getBalances();
  //   await dispatch(fetchTokens(balances!));
  // };

  const updateChain = async (chainName: string) => {
    if (chainName === "BNB") {
      dispatch(switchToBNB());
      if (isFirstTime) {
        setLoading(true);
        const bnbBalance =
          await accountServices?.bnbAccountService.getBalances();
        await dispatch(fetchBnbTokens(bnbBalance!));
        setLoading(false);
      }
      setIsFirstTime(false);
    } else {
      dispatch(switchToOPBNB());
    }
  };

  const updateOpBnbBalance = async () => {
    setLoading(true);
    const opBnbBalances =
      await accountServices?.opBnbAccountService.getBalances();
    await dispatch(fetchOpBnbTokens(opBnbBalances!));
    setLoading(false);
  };

  const updateBnbBalance = async () => {
    setLoading(true);
    const bnbBalances = await accountServices?.bnbAccountService.getBalances();
    await dispatch(fetchBnbTokens(bnbBalances!));
    setLoading(false);
  };

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleAmount1Change = (event: any) => {
    const inputValue = event.target.value;
    var sanitizedInput = inputValue.replace(/[^0-9.]/g, "");
    const parts = sanitizedInput.split(".");
    let decimalPart = parts[1] || "";
    if (decimalPart.length > 4) {
      sanitizedInput = sanitizedInput.slice(0, sanitizedInput.length - 1);
    }
    setTokenOneAmount(sanitizedInput);
    if (opBnBtokenOne.name === "BUSD") {
      setTokenTwoAmount(
        (sanitizedInput / opBnbTokens.tokens[0].price) * 0.9975,
      );
    } else {
      setTokenTwoAmount(sanitizedInput * opBnbTokens.tokens[0].price * 0.9975);
    }
  };

  const handleAmount2Change = (event: any) => {
    const inputValue = event.target.value;
    var sanitizedInput = inputValue.replace(/[^0-9.]/g, "");
    const parts = sanitizedInput.split(".");
    let decimalPart = parts[1] || "";
    if (decimalPart.length > 4) {
      sanitizedInput = sanitizedInput.slice(0, sanitizedInput.length - 1);
    }
    setTokenTwoAmount(sanitizedInput);
    if (opBnBtokenTwo.name === "BUSD") {
      setTokenOneAmount(
        (sanitizedInput / opBnbTokens.tokens[0].price / 0.9975).toFixed(2),
      );
    } else {
      setTokenOneAmount(
        ((sanitizedInput * opBnbTokens.tokens[0].price) / 0.9975).toFixed(2),
      );
    }
  };

  const handleSwap = async () => {
    setLoading(true);
    if (chain.chainName === "OPBNB") {
      const assetName = opBnBtokenOne.name;
      if (
        tokenOneAmount >
        (assetName === "BNB"
          ? opBnbTokens.tokens[0].balance
          : opBnbTokens.tokens[1])
      ) {
        toast.error(`Invalid ${assetName} Amount`, {
          position: "bottom-center",
        });
        return;
      }
      const toastId = toast.loading(
        `Swapping ${assetName} to ${opBnBtokenTwo.name} `,
        {
          position: "bottom-center",
        },
      );
      try {
        if (assetName === "BNB") {
          await accountServices?.opBnbAccountService.swapBnBforBUSD(
            tokenOneAmount,
          );
        } else {
          await accountServices?.opBnbAccountService.swapBUSDforBNB(
            tokenOneAmount,
          );
        }
        toast.success("Swap Successful", {
          position: "bottom-center",
          id: toastId,
          duration: 3000,
        });
        setLoading(false);
        delay(3000);
        await updateOpBnbBalance();
      } catch (e) {
        console.error(e);
        toast.error("Transaction Unsuccessful", {
          position: "bottom-center",
          id: toastId,
          duration: 3000,
        });
        setLoading(false);
      }
    } else {
      const assetName: string = bnBtokenOne.name;
      if (
        tokenOneAmount >
        (assetName === "BNB"
          ? bnbTokens.tokens[0].balance
          : bnbTokens.tokens[1])
      ) {
        toast.error(`Invalid ${assetName} Amount`, {
          position: "bottom-center",
        });
        return;
      }
      const toastId = toast.loading(
        `Swapping ${assetName} to ${bnBtokenTwo.name} `,
        {
          position: "bottom-center",
        },
      );
      try {
        if (assetName === "BNB") {
          await accountServices?.bnbAccountService.swapBnBforBUSD(
            tokenOneAmount,
          );
        } else {
          await accountServices?.bnbAccountService.swapBUSDforBNB(
            tokenOneAmount,
          );
        }
        toast.success("Swap Successful", {
          position: "bottom-center",
          id: toastId,
          duration: 3000,
        });
        setLoading(false);
        delay(3000);
        await updateBnbBalance();
      } catch (e) {
        console.error(e);
        toast.error("Transaction Unsuccessful", {
          position: "bottom-center",
          id: toastId,
          duration: 3000,
        });
        setLoading(false);
      }
    }
  };

  const exchange = () => {
    const tempTokenAmount = tokenOneAmount;
    setTokenOneAmount(tokenTwoAmount);
    setTokenTwoAmount(tempTokenAmount);
    if (opBnBtokenOne.name === "BNB") {
      setOpBnBtokenOne(opBnbTokens.tokens[1]);
      setOpBnBtokenTwo(opBnbTokens.tokens[0]);
    } else {
      setOpBnBtokenOne(opBnbTokens.tokens[0]);
      setOpBnBtokenTwo(opBnbTokens.tokens[1]);
    }
    if (bnBtokenOne.name === "BNB") {
      setBnBtokenOne(bnbTokens.tokens[1]);
      setBnBtokenTwo(bnbTokens.tokens[0]);
    } else {
      setBnBtokenOne(bnbTokens.tokens[0]);
      setBnBtokenTwo(bnbTokens.tokens[1]);
    }
  };

  return (
    <div className="w-full h-full flex flex-col space-y-[3vh] ">
      <div className="flex justify-between items-center px-[2vw] py-[2vh]">
        <div className="text-white font-satoshi text-[1.6vw] font-medium">
          Swap
        </div>
        <div className="flex px-2 space-x-4">
          <div
            onClick={() => updateChain("OPBNB")}
            className={`${
              chain.chainName === "OPBNB" ? "bg-[#F3EF52] " : "text-white"
            } px-[2vw] py-1 rounded-2xl cursor-pointer duration-100`}
          >
            OPBNB
          </div>
          <div
            onClick={() => updateChain("BNB")}
            className={`${
              chain.chainName === "BNB" ? "bg-[#F3EF52]" : "text-white"
            } px-[2vw] py-1 rounded-2xl cursor-pointer duration-100`}
          >
            BSC
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-[2vh] px-[2vw] w-full relative">
        <div className="h-[200px] bg-[#32363E] flex rounded-2xl justify-between px-6 pt-5 pb-3">
          <div className="flex flex-col justify-between h-full">
            <div className="flex space-x-5 items-center">
              <div className="bg-white py-2 px-2 rounded-full">
                <Image
                  src={
                    chain.chainName === "OPBNB"
                      ? opBnBtokenOne.name === "BNB"
                        ? "/Bnb2.png"
                        : "/busd2.png"
                      : bnBtokenOne.name === "BNB"
                      ? "/Bnb2.png"
                      : "/busd2.png"
                  }
                  alt="token"
                  width={80}
                  height={80}
                  className="w-[2vw] h-[2vw]"
                />
              </div>
              <div className="text-[1.2vw] text-gray-300 tracking-wide font-satoshi font-medium">
                {chain.chainName === "OPBNB"
                  ? opBnBtokenOne.name
                  : bnBtokenOne.name}
              </div>
            </div>
            <div>
              <input
                onChange={handleAmount1Change}
                value={tokenOneAmount}
                autoFocus
                placeholder="0.00"
                className="h-[5vw] outline outline-none w-1/2 text-[2vw] px-4 bg-transparent text-white placeholder-gray-600"
              />
            </div>
          </div>
          <div className="flex flex-col justify-between  items-end h-full">
            <div
              onClick={() => {
                setTokenOneAmount(
                  chain.chainName === "OPBNB"
                    ? opBnBtokenOne.balance
                    : bnBtokenOne.balance,
                );
              }}
              className="text-white px-2 py-2 text-[1.2vw] cursor-pointer"
            >
              MAX{" "}
              {chain.chainName === "OPBNB"
                ? opBnBtokenOne.name === "BNB"
                  ? opBnbTokens.tokens[0].balance.toFixed(6)
                  : opBnbTokens.tokens[1].balance.toFixed(6)
                : bnBtokenOne.name === "BNB"
                ? bnbTokens.tokens[0].balance.toFixed(6)
                : bnbTokens.tokens[1].balance.toFixed(6)}
            </div>
            <div className="text-gray-400 text-[1.3vw] mb-2">
              ~ ${" "}
              {Number.isNaN(parseFloat(tokenOneAmount))
                ? "0.00"
                : (parseFloat(tokenOneAmount) * opBnBtokenOne.price).toFixed(4)}
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
                  src={
                    chain.chainName === "OPBNB"
                      ? opBnBtokenTwo.name === "BNB"
                        ? "/Bnb2.png"
                        : "/busd2.png"
                      : bnBtokenOne.name === "BNB"
                      ? "/Bnb2.png"
                      : "/busd2.png"
                  }
                  alt="token"
                  width={80}
                  height={80}
                  className="w-[2vw] h-[2vw]"
                />
              </div>
              <div className="text-[1.2vw] text-gray-300 tracking-wide font-satoshi font-medium">
                {chain.chainName === "OPBNB"
                  ? opBnBtokenTwo.name
                  : bnBtokenTwo.name}
              </div>
            </div>
            <div>
              <input
                onChange={handleAmount2Change}
                value={tokenTwoAmount}
                placeholder="0.00"
                className="h-[5vw] outline outline-none w-1/2 text-[2vw] px-4 bg-transparent text-white placeholder-gray-600"
              />
            </div>
          </div>
          <div className="flex flex-col justify-between  h-full">
            <div></div>
            <div className="text-gray-400 text-[1.3vw] mb-2">
              ~ ${" "}
              {Number.isNaN(parseFloat(tokenTwoAmount))
                ? "0.00"
                : (parseFloat(tokenTwoAmount) * opBnBtokenTwo.price).toFixed(4)}
            </div>
          </div>
        </div>
      </div>
      <div className="px-8 flex justify-center">
        {loading ? (
          <Button className="hover:bg-[#F3EF52] bg-[#F3EF52] rounded-2xl w-1/2 h-[5.3vw] text-[1.8vw] font-satoshi text-black font-medium ">
            <BiLoaderCircle className=" animate-spin w-7 h-7" />
          </Button>
        ) : (
          <Button
            onClick={handleSwap}
            className="hover:bg-[#F3EF52] bg-[#F3EF52] rounded-2xl w-1/2 h-[5.3vw] text-[1.8vw] font-satoshi text-black font-medium "
          >
            SWAP
          </Button>
        )}
      </div>
    </div>
  );
};

export default Swap;
