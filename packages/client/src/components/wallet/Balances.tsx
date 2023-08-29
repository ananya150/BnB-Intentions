import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  AccountService,
  getAccountService,
} from "../../services/passkeyService";
import { ethers } from "ethers";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchTokens } from "../../redux/features/balanceSlice";
import { BiLoaderCircle } from "react-icons/bi";
import { IoArrowBackOutline } from "react-icons/io5";

interface props {
  address: string;
  pubKeyX: string;
  pubKeyY: string;
  keyId: string;
}

const Balances = ({ address, pubKeyX, pubKeyY, keyId }: props) => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.tokens);
  const account = useAppSelector((state) => state.accountSlice);
  const [accountService, setAccountService] = useState<AccountService | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [sendToken, setSendToken] = useState<string | null>(null);

  useEffect(() => {
    const getBalnce = async () => {
      setLoading(true);
      const account = getAccountService(address, pubKeyX, pubKeyY, keyId);
      setAccountService(account);
      const balances = await account.getBalances();
      await dispatch(fetchTokens(balances));
      setLoading(false);
    };
    getBalnce();
  }, []);

  const _updateBalance = async () => {
    const balances = await accountService?.getBalances();
    await dispatch(fetchTokens(balances!));
  };

  // const requestFunds = async () => {
  //   setLoading(true);
  //   await accountService?.airdrop();
  //   const balances = await accountService?.getBalances();
  //   await dispatch(fetchTokens(balances!));
  //   setLoading(false);
  // };

  const tos = [
    "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
  ];

  const values = ["0", "0"];
  const calldatas = [
    "0x095ea7b30000000000000000000000009fe46736679d2d9a65f0992f2272de9f3c7fa6e00000000000000000000000000000000000000000000000056bc75e2d63100000",
    "0x20507ebb0000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000000000000000000000000000016345785d8a0000",
  ];

  const requestFunds = async () => {
    setLoading(true);
    // await accountService?.execute('0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', "0.1", '0xab27021e000000000000000000000000000000000000000000000000016345785d8a00000000000000000000000000000000000000000000000000056bc75e2d63100000');
    await accountService?.executeBatch(tos, values, calldatas);
    await _updateBalance();
    setLoading(false);
  };

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

  const sendBnBToken = async () => {
    console.log("sendign bnb");
    console.log(to);
    console.log(amount);
  };

  const handleAmountChange = (event: any) => {
    const inputValue = event.target.value;
    var sanitizedInput = inputValue.replace(/[^0-9.]/g, "");
    const parts = sanitizedInput.split(".");
    let decimalPart = parts[1] || "";
    if (decimalPart.length > 2) {
      console.log("trimming");
      sanitizedInput = sanitizedInput.slice(0, sanitizedInput.length - 1);
    }
    setAmount(sanitizedInput);
  };

  const handleBNBSend = async () => {
    if (parseFloat(amount) > tokens.tokens[0].balance || amount === "") {
      console.log("Invalid Amount");
      return;
    }
    if (!ethers.utils.isAddress(to)) {
      console.log("Invalid Address");
      return;
    }
    setLoading(true);
    await accountService?.sendBNB(to, amount);
    back();
    setLoading(false);
    _updateBalance();
  };

  const handleBUSDSend = async () => {
    if (parseFloat(amount) > tokens.tokens[1].balance || amount === "") {
      console.log("Invalid Amount");
      return;
    }
    if (!ethers.utils.isAddress(to)) {
      console.log("Invalid Address");
      return;
    }
    setLoading(true);
    await accountService?.sendBUSD(to, amount);
    back();
    setLoading(false);
    _updateBalance();
  };

  const sendBnBLayout = (
    <div className="flex flex-col mt-6 px-4 pt-4 pb-2">
      <div className="flex justify-between items-center">
        <IoArrowBackOutline onClick={back} className="h-8 w-8 cursor-pointer" />
        <div className="font-satoshi text-[25px] font-medium mr-4 mt-2">
          Transfer
        </div>
        <div></div>
      </div>
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
              className="h-[50px] w-full rounded-2xl bg-[#f8f597] outline outline-transparent pl-[120px] "
            ></input>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="text-gray-800 font-satoshi">Amount</div>
          <div id="input-container" className="w-full">
            <div className="flex flex-col justify-center h-[40px] my-[5px] items-center px-4 ml-3 rounded-xl">
              <div
                onClick={() => {
                  setAmount(`${tokens.tokens[0].balance}`);
                }}
                className="text-[13px] cursor-pointer font-satoshi"
              >
                MAX: {tokens.tokens[0].balance}
              </div>
            </div>
            <input
              value={amount}
              onChange={handleAmountChange}
              className="h-[50px] w-full rounded-2xl bg-[#f8f597] outline outline-transparent pl-[120px] "
            ></input>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-8">
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

  const sendBusdToken = async () => {
    console.log("sendign bnb");
    console.log(to);
    console.log(amount);
  };

  const sendBusdLayout = (
    <div className="flex flex-col mt-6 px-4 pt-4 pb-2">
      <div className="flex justify-between items-center">
        <IoArrowBackOutline onClick={back} className="h-8 w-8 cursor-pointer" />
        <div className="font-satoshi text-[25px] font-medium mr-4 mt-2">
          Transfer
        </div>
        <div></div>
      </div>
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
              className="h-[50px] w-full rounded-2xl bg-[#f8f597] outline outline-transparent pl-[130px] "
            ></input>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="text-gray-800 font-satoshi">Amount</div>
          <div id="input-container" className="w-full">
            <div className="flex flex-col justify-center h-[40px] my-[5px] items-center px-6 ml-3 rounded-xl">
              <div
                onClick={() => {
                  setAmount(`${tokens.tokens[1].balance}`);
                }}
                className="text-[13px] cursor-pointer font-satoshi"
              >
                MAX: {tokens.tokens[1].balance}
              </div>
            </div>
            <input
              value={amount}
              onChange={handleAmountChange}
              className="h-[50px] w-full rounded-2xl bg-[#f8f597] outline outline-transparent pl-[130px] "
            ></input>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-8">
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
    <div className="flex flex-col space-y-9">
      <div className="pt-[50px] flex flex-col space-y-4">
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
              <div>{tokens.tokens[0].balance}</div>
            </div>
          </div>
          <div className="font-satoshi text-[27px] font-medium">
            ${(tokens.tokens[0].balance * tokens.tokens[0].price).toFixed(2)}
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
              <div>{tokens.tokens[1].balance}</div>
            </div>
          </div>
          <div className="font-satoshi text-[27px] font-medium">
            ${(tokens.tokens[1].balance * tokens.tokens[1].price).toFixed(2)}
          </div>
        </div>
      </div>
      <div className="text-[13px] font-satoshi">
        This wallet is a proof of concept for Intents Architecture with Account
        Abstraction and is meant for testing purposes only.
      </div>
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
    <div>
      {sendToken
        ? sendToken === "bnb"
          ? sendBnBLayout
          : sendBusdLayout
        : balances}
    </div>
  );
};

export default Balances;
