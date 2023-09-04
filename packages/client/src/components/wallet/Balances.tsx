import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  OpBnbAccountService,
  BnbAccountService,
  getAccountService,
} from "../../services/passkeyService";
import { ethers } from "ethers";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchOpBnbTokens } from "../../redux/features/opBnBbalanceSlice";
import { fetchBnbTokens } from "../../redux/features/bnbBalanceSlice";
import { switchToBNB, switchToOPBNB } from "../../redux/features/chainSlice";
import { BiLoaderCircle } from "react-icons/bi";
import { IoArrowBackOutline } from "react-icons/io5";
import { FiRefreshCcw } from "react-icons/fi";
import { toast } from "react-hot-toast";

interface props {
  address: string;
  pubKeyX: string;
  pubKeyY: string;
  keyId: string;
}

const Balances = ({ address, pubKeyX, pubKeyY, keyId }: props) => {
  const dispatch = useAppDispatch();
  // const tokens = useAppSelector((state) => state.tokens);
  const opBnbTokens = useAppSelector((state) => state.opBnbTokens);
  const bnbTokens = useAppSelector((state) => state.bnbTokens);
  const account = useAppSelector((state) => state.accountSlice);

  const chain = useAppSelector((state) => state.chainSlice);
  const [loading, setLoading] = useState(false);
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [sendToken, setSendToken] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [accountServices, setAccountServices] = useState<accounts | null>(null);
  const [addressError, setAddressError] = useState(false);
  const [amountErr, setAmountErr] = useState(false);

  interface accounts {
    opBnbAccountService: OpBnbAccountService;
    bnbAccountService: BnbAccountService;
  }

  useEffect(() => {
    const getBalnce = async () => {
      setLoading(true);
      const account: accounts = getAccountService(
        address,
        pubKeyX,
        pubKeyY,
        keyId,
      );
      setAccountServices(account);
      const opBnbBalances = await account.opBnbAccountService.getBalances();
      await dispatch(fetchOpBnbTokens(opBnbBalances!));
      setLoading(false);
    };
    getBalnce();
  }, []);

  const updateOpBnbBalance = async () => {
    setSpinning(true);
    setLoading(true);
    const opBnbBalances =
      await accountServices?.opBnbAccountService.getBalances();
    await dispatch(fetchOpBnbTokens(opBnbBalances!));
    setSpinning(false);
    setLoading(false);
  };

  const updateBnbBalance = async () => {
    setSpinning(true);
    setLoading(true);
    const bnbBalances = await accountServices?.bnbAccountService.getBalances();
    await dispatch(fetchBnbTokens(bnbBalances!));
    setSpinning(false);
    setLoading(false);
  };

  const updateBalance = async () => {
    setSpinning(true);
    setLoading(true);
    const opBnbBalances =
      await accountServices?.opBnbAccountService.getBalances();
    await dispatch(fetchOpBnbTokens(opBnbBalances!));
    const bnbBalance = await accountServices?.bnbAccountService.getBalances();
    await dispatch(fetchBnbTokens(bnbBalance!));
    setSpinning(false);
    setLoading(false);
  };

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

  const requestFunds = async () => {
    const total =
      opBnbTokens.tokens[0].balance * opBnbTokens.tokens[0].price +
      opBnbTokens.tokens[1].balance +
      bnbTokens.tokens[0].balance * bnbTokens.tokens[0].price +
      bnbTokens.tokens[1].balance;
    if (total > 15) {
      toast.error("Test funds available", {
        position: "bottom-center",
      });
      return;
    }
    const toastId = toast.loading("Airdropping test funds", {
      position: "bottom-center",
    });
    setLoading(true);
    try {
      await accountServices?.opBnbAccountService.airdrop();
      toast.success("Airdrop Successful", {
        position: "bottom-center",
        id: toastId,
        duration: 3000,
      });
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
      toast.error("Some error occured", {
        position: "bottom-center",
        id: toastId,
        duration: 3000,
      });
    }
    delay(3000);
    await updateOpBnbBalance();
  };

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const sendBnB = () => {
    setSendToken("bnb");
  };

  const sendBusd = () => {
    setSendToken("busd");
  };

  const back = () => {
    setSendToken(null);
    setTo("");
    setAmount("");
  };

  const handleAmountChange = (event: any) => {
    const inputValue = event.target.value;
    var sanitizedInput = inputValue.replace(/[^0-9.]/g, "");
    const parts = sanitizedInput.split(".");
    let decimalPart = parts[1] || "";
    if (decimalPart.length > 3) {
      sanitizedInput = sanitizedInput.slice(0, sanitizedInput.length - 1);
    }
    setAmount(sanitizedInput);
  };

  const handleBNBSend = async () => {
    setAmountErr(false);
    setAddressError(false);
    const toastId = toast.loading("Sending Transaction", {
      position: "bottom-center",
    });
    try {
      let tokens;
      let accountService;
      if (chain.chainName === "OPBNB") {
        tokens = opBnbTokens;
        accountService = accountServices?.opBnbAccountService;
      } else {
        tokens = bnbTokens;
        accountService = accountServices?.bnbAccountService;
      }
      if (parseFloat(amount) > tokens.tokens[0].balance || amount === "") {
        toast.dismiss(toastId);
        setAmountErr(true);
        return;
      }
      if (!ethers.utils.isAddress(to)) {
        toast.dismiss(toastId);
        setAddressError(true);
        return;
      }
      setLoading(true);
      const txResp = await accountService?.sendBNB(to, amount);
      back();
      setLoading(false);
      toast.success("Transaction Successful", {
        position: "bottom-center",
        id: toastId,
        duration: 3000,
      });
    } catch (e) {
      console.error(e);
      back();
      toast.error("Transaction Unsuccessful", {
        position: "bottom-center",
        id: toastId,
        duration: 3000,
      });
      setLoading(false);
    }
    await delay(3000);
    chain.chainName === "OPBNB"
      ? await updateOpBnbBalance()
      : await updateBnbBalance();
  };

  const handleBUSDSend = async () => {
    setAmountErr(false);
    setAddressError(false);
    const toastId = toast.loading("Sending Transaction", {
      position: "bottom-center",
    });
    try {
      let tokens;
      let accountService;
      if (chain.chainName === "OPBNB") {
        tokens = opBnbTokens;
        accountService = accountServices?.opBnbAccountService;
      } else {
        tokens = bnbTokens;
        accountService = accountServices?.bnbAccountService;
      }
      if (parseFloat(amount) > tokens.tokens[1].balance || amount === "") {
        toast.dismiss(toastId);
        setAmountErr(true);
        return;
      }
      if (!ethers.utils.isAddress(to)) {
        toast.dismiss(toastId);
        setAddressError(true);
        return;
      }
      setLoading(true);
      await accountService?.sendBUSD(to, amount);
      back();
      setLoading(false);
      toast.success("Transaction Successful", {
        position: "bottom-center",
        id: toastId,
        duration: 3000,
      });
    } catch (e) {
      console.error(e);
      back();
      toast.error("Transaction Unsuccessful", {
        position: "bottom-center",
        id: toastId,
        duration: 3000,
      });
      setLoading(false);
    }
    await delay(3000);
    chain.chainName === "OPBNB"
      ? await updateOpBnbBalance()
      : await updateBnbBalance();
  };

  const sendBnBLayout = (
    <div className="flex flex-col px-1 md:pt-4 pb-2">
      <div className="flex md:mt-6 mt-4 flex-col space-y-3 md:space-y-5">
        <div className="flex md:flex-col md:space-y-2 space-x-10 md:space-x-0 items-center md:items-start">
          <div className="text-gray-800 md:text-base text-[12px] font-satoshi">
            To
          </div>
          <div id="input-container" className="w-full">
            <div className="my-[5px] h-[40px] mx-2 flex space-x-2 items-center px-2 rounded-xl">
              <div className="bg-black py-1  px-1 mb-2 md:mb-1 rounded-full">
                <Image
                  src="/Bnb2.png"
                  alt="logo"
                  height={80}
                  width={80}
                  className="md:w-[20px] md:h-[20px] w-[16px] h-[16px]"
                />
              </div>
              <div className="md:text-[13px] text-[11px] pb-2 md:pb-0 font-satoshi">
                BNB
              </div>
            </div>
            <input
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
              }}
              className={`md:h-[50px] h-[40px] w-full rounded-2xl bg-[#f8f597] outline outline-transparent md:pl-[140px] pl-[90px] text-[10px] md:text-base ${
                addressError ? "border border-red-500" : ""
              } `}
            ></input>
          </div>
        </div>
        <div className="flex md:flex-col md:space-y-2 space-x-3 md:space-x-0 items-center md:items-start">
          <div className="text-gray-800 md:text-base text-[12px] font-satoshi">
            Amount
          </div>
          <div id="input-container" className="w-full">
            <div className="flex flex-col justify-center h-[30px] my-[5px] items-center px-4 ml-1 rounded-xl">
              <div
                onClick={() => {
                  setAmount(
                    `${
                      chain.chainName === "OPBNB"
                        ? opBnbTokens.tokens[0].balance
                        : bnbTokens.tokens[0].balance
                    }`,
                  );
                }}
                className="md:text-[13px] text-[10px] mt-2 cursor-pointer font-satoshi"
              >
                MAX:{" "}
                {chain.chainName === "OPBNB"
                  ? opBnbTokens.tokens[0].balance.toFixed(4)
                  : bnbTokens.tokens[0].balance.toFixed(4)}
              </div>
            </div>
            <input
              value={amount}
              onChange={handleAmountChange}
              className={`md:h-[50px] h-[40px] w-full rounded-2xl bg-[#f8f597] outline outline-transparent md:pl-[140px] pl-[90px] text-[10px] md:text-base ${
                amountErr ? "border border-red-500" : ""
              }`}
            ></input>
          </div>
        </div>
      </div>
      <div className="w-full flex space-x-4 mt-8">
        <button
          onClick={back}
          className="w-1/3 rounded-3xl py-1 px-4 text-white bg-black flex flex-col justify-center items-center"
        >
          <IoArrowBackOutline className="md:h-8 md:w-8 h-4 w-5 cursor-pointer text-white" />
        </button>
        {loading ? (
          <button className="w-2/3 rounded-3xl md:py-4 py-2 text-white bg-black flex justify-center">
            <BiLoaderCircle className="text-white animate-spin md:w-6 md:h-6 w-3 h-3" />
          </button>
        ) : (
          <button
            onClick={handleBNBSend}
            className="w-2/3 rounded-3xl md:py-4 py-2 text-white bg-black md:text-base text-[12px]"
          >
            SEND
          </button>
        )}
      </div>
    </div>
  );

  const sendBusdLayout = (
    <div className="flex flex-col px-1 md:pt-4 pb-2">
      <div className="flex md:mt-6 mt-4 flex-col space-y-3 md:space-y-5">
        <div className="flex md:flex-col md:space-y-2 space-x-10 md:space-x-0 items-center md:items-start">
          <div className="text-gray-800 md:text-base text-[12px] font-satoshi">
            To
          </div>
          <div id="input-container" className="w-full">
            <div className="my-[5px] h-[40px] mx-2 flex space-x-2 items-center px-2 rounded-xl">
              <Image
                src="/Busd.png"
                alt="logo"
                height={100}
                width={100}
                className="md:w-[30px] w-[25px] md:h-[30px] mb-2 md:mb-0 h-[25px]"
              />
              <div className="md:text-[13px] text-[11px] pb-2 md:pb-0 font-satoshi">
                BUSD
              </div>
            </div>
            <input
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
              }}
              className={`md:h-[50px] h-[40px] w-full rounded-2xl bg-[#f8f597] outline outline-transparent md:pl-[140px] pl-[90px] text-[10px] md:text-base ${
                addressError ? "border border-red-500" : ""
              } `}
            ></input>
          </div>
        </div>
        <div className="flex md:flex-col md:space-y-2 space-x-3 md:space-x-0 items-center md:items-start">
          <div className="text-gray-800 md:text-base text-[12px] font-satoshi">
            Amount
          </div>
          <div id="input-container" className="w-full">
            <div className="flex flex-col justify-center h-[30px] my-[5px] items-center px-4 ml-1 rounded-xl">
              <div
                onClick={() => {
                  setAmount(
                    `${
                      chain.chainName === "OPBNB"
                        ? opBnbTokens.tokens[1].balance
                        : bnbTokens.tokens[1].balance
                    }`,
                  );
                }}
                className="md:text-[13px] text-[10px] mt-2 cursor-pointer font-satoshi"
              >
                MAX:{" "}
                {chain.chainName === "OPBNB"
                  ? opBnbTokens.tokens[1].balance.toFixed(2)
                  : bnbTokens.tokens[1].balance.toFixed(2)}
              </div>
            </div>
            <input
              value={amount}
              onChange={handleAmountChange}
              className={`md:h-[50px] h-[40px] w-full rounded-2xl bg-[#f8f597] outline outline-transparent md:pl-[140px] pl-[90px] text-[10px] md:text-base ${
                amountErr ? "border border-red-500" : ""
              }`}
            ></input>
          </div>
        </div>
      </div>
      <div className="w-full flex space-x-4 mt-8">
        <button
          onClick={back}
          className="w-1/3 rounded-3xl py-1 px-4 text-white bg-black flex flex-col justify-center items-center"
        >
          <IoArrowBackOutline className="md:h-8 md:w-8 h-4 w-5 cursor-pointer text-white" />
        </button>
        {loading ? (
          <button className="w-2/3 rounded-3xl md:py-4 py-2 text-white bg-black flex justify-center">
            <BiLoaderCircle className="text-white animate-spin md:w-6 md:h-6 w-3 h-3" />
          </button>
        ) : (
          <button
            onClick={handleBUSDSend}
            className="w-2/3 rounded-3xl md:py-4 py-2 text-white bg-black md:text-base text-[12px]"
          >
            SEND
          </button>
        )}
      </div>
    </div>
  );

  const balances = (
    <div className="flex flex-col md:justify-between space-y-3 md:pt-4 pt-4">
      <div className="flex flex-col md:space-y-5 space-y-3">
        <div
          onClick={sendBnB}
          className="flex justify-between items-center cursor-pointer hover:bg-[#f7f486] px-2 md:py-2 py-1 rounded-xl"
        >
          <div className="flex space-x-4 items-center">
            <div className="bg-black rounded-full md:w-[3vw] md:h-[3vw] w-[40px] h-[40px] md:py-[0.45vw] md:px-[0.45vw] px-[7px] py-[7px]">
              <Image
                src="/Bnb2.png"
                alt="logo"
                height={80}
                width={80}
                className="md:w-[2.1vw] md:h-[2.1vw] w-[26px] h-[26px]"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div className="md:text-[0.9vw] text-[12px] font-sans">BNB</div>
              <div className="md:text-[0.8vw] text-[10px] ">
                {chain.chainName === "OPBNB"
                  ? opBnbTokens.tokens[0].balance.toFixed(4)
                  : bnbTokens.tokens[0].balance.toFixed(4)}
              </div>
            </div>
          </div>
          <div className="font-satoshi md:text-[1.6vw] text-[15px] font-medium">
            $
            {chain.chainName === "OPBNB"
              ? (
                  opBnbTokens.tokens[0].balance * opBnbTokens.tokens[0].price
                ).toFixed(2)
              : (
                  bnbTokens.tokens[0].balance * bnbTokens.tokens[0].price
                ).toFixed(2)}
          </div>
        </div>
        <div
          onClick={sendBusd}
          className="flex justify-between items-center cursor-pointer hover:bg-[#f7f486] px-2 md:py-2 py-1 rounded-xl"
        >
          <div className="flex space-x-4 items-center">
            <Image
              src="/Busd.png"
              alt="logo"
              height={100}
              width={100}
              className="md:w-[3vw] md:h-[3vw] h-[40px] w-[40px]"
            />
            <div className="flex flex-col justify-between">
              <div className="md:text-[0.9vw] text-[12px] font-sans">BUSD</div>
              <div className="md:text-[0.8vw] text-[10px]">
                {chain.chainName === "OPBNB"
                  ? opBnbTokens.tokens[1].balance.toFixed(4)
                  : bnbTokens.tokens[1].balance.toFixed(4)}
              </div>
            </div>
          </div>
          <div className="font-satoshi md:text-[1.6vw] text-[15px] font-medium">
            $
            {chain.chainName === "OPBNB"
              ? (
                  opBnbTokens.tokens[1].balance * opBnbTokens.tokens[1].price
                ).toFixed(2)
              : (
                  bnbTokens.tokens[1].balance * bnbTokens.tokens[1].price
                ).toFixed(2)}
          </div>
        </div>
      </div>
      {/* <div className="text-[13px] font-satoshi">
        This wallet is a proof of concept for Intents Architecture with Account
        Abstraction and is meant for testing purposes only.
      </div> */}
      <div className="w-full flex justify-center md:mt-0 pt-3">
        {loading ? (
          <button className="w-2/3 rounded-2xl py-2 md:rounded-3xl md:py-4 text-white bg-black flex justify-center">
            <BiLoaderCircle className="text-white animate-spin md:w-4 md:h-4 w-3 h-3" />
          </button>
        ) : (
          <button
            onClick={requestFunds}
            className="w-2/3 rounded-2xl py-[0.6vw] md:rounded-3xl md:py-[0.6vw] md:text-[0.8vw] text-[13px] text-white bg-black"
          >
            REQUEST FUNDS
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-full flex-col min-h-[39vh] space-y-[2vw]">
      <div className="flex justify-between md:mt-3 mt-4 items-center">
        <div className="">
          <div className="flex px-[0.7vw] space-x-4">
            <div
              onClick={() => updateChain("OPBNB")}
              className={`${
                chain.chainName === "OPBNB" ? "bg-black text-white" : ""
              } text-[10px] md:text-[1vw] h-[24px] md:h-[2vw] md:px-[2vw] py-1 px-[1vw] rounded-2xl cursor-pointer duration-100`}
            >
              OPBNB
            </div>
            <div
              onClick={() => updateChain("BNB")}
              className={`${
                chain.chainName === "BNB" ? "bg-black text-white" : ""
              } text-[10px] md:text-[1vw] h-[24px] md:h-[2vw] md:px-[2vw] py-1 px-[1vw] rounded-2xl cursor-pointer duration-100`}
            >
              BSC
            </div>
          </div>
        </div>
        <div className="px-[0.3vw]">
          <FiRefreshCcw
            onClick={
              chain.chainName === "OPBNB"
                ? updateOpBnbBalance
                : updateBnbBalance
            }
            className={`w-3 h-3 cursor-pointer rotate-180 ${
              spinning ? "animate-spin" : ""
            }`}
          />
        </div>
      </div>
      {sendToken
        ? sendToken === "bnb"
          ? sendBnBLayout
          : sendBusdLayout
        : balances}
    </div>
  );
};

export default Balances;
