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
      await accountService?.sendBNB(to, amount);
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
    <div className="flex flex-col px-4 pt-4 pb-2">
      <div className="flex mt-6 flex-col space-y-5">
        <div className="flex flex-col space-y-2">
          <div className="text-gray-800 font-satoshi">To</div>
          <div id="input-container" className="w-full">
            <div className="my-[5px] h-[40px] mx-2 flex space-x-2 items-center px-4 rounded-xl">
              <div className="bg-black py-1 px-1 rounded-full">
                <Image
                  src="/Bnb2.png"
                  alt="logo"
                  height={80}
                  width={80}
                  className="w-[20px] h-[20px]"
                />
              </div>
              <div className="text-[13px] font-satoshi">BNB</div>
            </div>
            <input
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
              }}
              className={`h-[50px] w-full rounded-2xl bg-[#f8f597] outline outline-transparent pl-[140px] ${
                addressError ? "border border-red-500" : ""
              } `}
            ></input>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="text-gray-800 font-satoshi">Amount</div>
          <div id="input-container" className="w-full">
            <div className="flex flex-col justify-center h-[40px] my-[5px] items-center px-4 ml-3 rounded-xl">
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
                className="text-[13px] cursor-pointer font-satoshi"
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
              className={`h-[50px] w-full rounded-2xl bg-[#f8f597] outline outline-transparent pl-[140px] ${
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
          <IoArrowBackOutline className="h-8 w-8 cursor-pointer text-white" />
        </button>
        {loading ? (
          <button className="w-2/3 rounded-3xl py-4 text-white bg-black flex justify-center">
            <BiLoaderCircle className="text-white animate-spin w-6 h-6" />
          </button>
        ) : (
          <button
            onClick={handleBNBSend}
            className="w-2/3 rounded-3xl py-4 text-white bg-black"
          >
            SEND
          </button>
        )}
      </div>
    </div>
  );

  const sendBusdLayout = (
    <div className="flex flex-col mt-6 px-4 pt-4 pb-2">
      <div className="flex flex-col space-y-5 mt-6">
        <div className="flex flex-col space-y-2">
          <div className="text-gray-800 font-satoshi">To</div>
          <div id="input-container" className="w-full">
            <div className="my-[5px] h-[40px] mx-2 flex space-x-2 items-center  px-4 rounded-xl">
              <Image
                src="/Busd.png"
                alt="logo"
                height={100}
                width={100}
                className="w-[30px] h-[30px]"
              />
              <div className="text-[13px] font-satoshi">BUSD</div>
            </div>
            <input
              value={to}
              onChange={(e) => {
                setTo(e.target.value);
              }}
              className={`h-[50px] w-full rounded-2xl bg-[#f8f597] outline outline-transparent pl-[140px] ${
                addressError ? "border border-red-500" : ""
              } `}
            ></input>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="text-gray-800 font-satoshi">Amount</div>
          <div id="input-container" className="w-full">
            <div className="flex flex-col justify-center h-[40px] my-[5px] items-center px-6 ml-3 rounded-xl">
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
                className="text-[13px] cursor-pointer font-satoshi"
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
              className={`h-[50px] w-full rounded-2xl bg-[#f8f597] outline outline-transparent pl-[140px] ${
                amountErr ? "border border-red-500" : ""
              } `}
            ></input>
          </div>
        </div>
      </div>
      <div className="w-full flex space-x-4 mt-8">
        <button
          onClick={back}
          className="w-1/3 rounded-3xl py-1 px-4 text-white bg-black flex flex-col justify-center items-center"
        >
          <IoArrowBackOutline className="h-8 w-8 cursor-pointer text-white" />
        </button>
        {loading ? (
          <button className="w-2/3 rounded-3xl py-4 text-white bg-black flex justify-center">
            <BiLoaderCircle className="text-white animate-spin w-6 h-6" />
          </button>
        ) : (
          <button
            onClick={handleBUSDSend}
            className="w-2/3 rounded-3xl py-4 text-white bg-black"
          >
            SEND
          </button>
        )}
      </div>
    </div>
  );

  const balances = (
    <div className="flex flex-col space-y-10 pt-9">
      <div className="flex flex-col space-y-6">
        <div
          onClick={sendBnB}
          className="flex justify-between items-center cursor-pointer hover:bg-[#f7f486] px-2 py-2 rounded-xl"
        >
          <div className="flex space-x-4 items-center">
            <div className="bg-black rounded-full w-[65px] h-[65px] py-3 px-3">
              <Image
                src="/Bnb2.png"
                alt="logo"
                height={80}
                width={80}
                className="w-[42px] h-[42px]"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div className="text-[20px] font-sans">BNB</div>
              <div>
                {chain.chainName === "OPBNB"
                  ? opBnbTokens.tokens[0].balance.toFixed(4)
                  : bnbTokens.tokens[0].balance.toFixed(4)}
              </div>
            </div>
          </div>
          <div className="font-satoshi text-[27px] font-medium">
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
          className="flex justify-between items-center cursor-pointer hover:bg-[#f7f486] px-2 py-2 rounded-xl"
        >
          <div className="flex space-x-4 items-center">
            <Image
              src="/Busd.png"
              alt="logo"
              height={100}
              width={100}
              className="w-[65px] h-[65px]"
            />
            <div className="flex flex-col justify-between">
              <div className="text-[20px] font-sans">BUSD</div>
              <div>
                {chain.chainName === "OPBNB"
                  ? opBnbTokens.tokens[1].balance.toFixed(4)
                  : bnbTokens.tokens[1].balance.toFixed(4)}
              </div>
            </div>
          </div>
          <div className="font-satoshi text-[27px] font-medium">
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
      <div className="w-full flex justify-center">
        {loading ? (
          <button className="w-2/3 rounded-3xl py-4 text-white bg-black flex justify-center">
            <BiLoaderCircle className="text-white animate-spin w-6 h-6" />
          </button>
        ) : (
          <button
            onClick={requestFunds}
            className="w-2/3 rounded-3xl py-4 text-white bg-black"
          >
            REQUEST FUNDS
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between mt-6 items-center">
        <div className="">
          <div className="flex px-2 space-x-4">
            <div
              onClick={() => updateChain("OPBNB")}
              className={`${
                chain.chainName === "OPBNB" ? "bg-black text-white" : ""
              } px-10 py-1 rounded-2xl cursor-pointer duration-100`}
            >
              OPBNB
            </div>
            <div
              onClick={() => updateChain("BNB")}
              className={`${
                chain.chainName === "BNB" ? "bg-black text-white" : ""
              } px-10 py-1 rounded-2xl cursor-pointer duration-100`}
            >
              BNB
            </div>
          </div>
        </div>
        <div className="px-2">
          <FiRefreshCcw
            onClick={
              chain.chainName === "OPBNB"
                ? updateOpBnbBalance
                : updateBnbBalance
            }
            className={`w-4 h-4 cursor-pointer rotate-180 ${
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
