import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { TbArrowsExchange } from "react-icons/tb";
import Image from "next/image";
import { BiLoaderCircle } from "react-icons/bi";
import { switchToBNB, switchToOPBNB } from "../../redux/features/chainSlice";
import { fetchBnbTokens } from "../../redux/features/bnbBalanceSlice";
import { fetchOpBnbTokens } from "../../redux/features/opBnBbalanceSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toast } from "react-hot-toast";
import {
  OpBnbAccountService,
  BnbAccountService,
  getAccountService,
} from "../../services/passkeyService";

const Bridge = () => {
  const dispatch = useAppDispatch();
  const chain = useAppSelector((state) => state.chainSlice);
  const account = useAppSelector((state) => state.accountSlice);
  const [loading, setLoading] = useState(false);

  const opBnbTokens = useAppSelector((state) => state.opBnbTokens);
  const bnbTokens = useAppSelector((state) => state.bnbTokens);

  const [tokenOneAmount, setTokenOneAmount] = useState<any>(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState<any>(null);
  const [accountServices, setAccountServices] = useState<accounts | null>(null);

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

  const exchange = () => {
    if (chain.chainName === "OPBNB") {
      dispatch(switchToBNB());
    } else {
      dispatch(switchToOPBNB());
    }
  };

  const handleAmount1Change = (event: any) => {
    const inputValue = event.target.value;
    var sanitizedInput = inputValue.replace(/[^0-9.]/g, "");
    const parts = sanitizedInput.split(".");
    let decimalPart = parts[1] || "";
    if (decimalPart.length > 4) {
      sanitizedInput = sanitizedInput.slice(0, sanitizedInput.length - 1);
    }
    setTokenOneAmount(sanitizedInput);
    setTokenTwoAmount(sanitizedInput * 0.9975);
  };

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleAmount2Change = (event: any) => {
    const inputValue = event.target.value;
    var sanitizedInput = inputValue.replace(/[^0-9.]/g, "");
    const parts = sanitizedInput.split(".");
    let decimalPart = parts[1] || "";
    if (decimalPart.length > 4) {
      sanitizedInput = sanitizedInput.slice(0, sanitizedInput.length - 1);
    }
    setTokenTwoAmount(sanitizedInput);
    setTokenOneAmount((sanitizedInput / 0.9975).toFixed(2));
  };

  const updateBalance = async () => {
    setLoading(true);
    const opBnbBalances =
      await accountServices?.opBnbAccountService.getBalances();
    await dispatch(fetchOpBnbTokens(opBnbBalances!));
    const bnbBalance = await accountServices?.bnbAccountService.getBalances();
    await dispatch(fetchBnbTokens(bnbBalance!));
    setLoading(false);
  };

  const handleBridge = async () => {
    if (chain.chainName === "OPBNB") {
      if (tokenOneAmount > opBnbTokens.tokens[1].balance) {
        toast.error("Invalid Amount", {
          position: "bottom-center",
        });
        return;
      }
      setLoading(true);
      const toastId = toast.loading(
        `Bridging from ${chain.chainName} to ${
          chain.chainName === "OPBNB" ? "BNB" : "OPBNB"
        } `,
        {
          position: "bottom-center",
        },
      );
      const bridgeResp =
        await accountServices?.opBnbAccountService.bridgeFrom(tokenOneAmount);
      if (bridgeResp) {
        toast.success("Bridge Successful", {
          position: "bottom-center",
          id: toastId,
          duration: 3000,
        });
        setLoading(false);
        await delay(3000);
        await updateBalance();
      } else {
        toast.error("Some error occurred", {
          position: "bottom-center",
          id: toastId,
          duration: 3000,
        });
        setLoading(false);
      }
    } else {
      if (tokenOneAmount > bnbTokens.tokens[1].balance) {
        toast.error("Invalid Amount", {
          position: "bottom-center",
        });
        return;
      }
      setLoading(true);
      const toastId = toast.loading(
        `Bridging from ${chain.chainName} to ${
          chain.chainName === "OPBNB" ? "BNB" : "OPBNB"
        } `,
        {
          position: "bottom-center",
        },
      );
      const bridgeResp =
        await accountServices?.bnbAccountService.bridgeFrom(tokenOneAmount);
      if (bridgeResp) {
        toast.success("Bridge Successful", {
          position: "bottom-center",
          id: toastId,
          duration: 3000,
        });
        setLoading(false);
        await delay(3000);
        await updateBalance();
      } else {
        toast.error("Some error occurred", {
          position: "bottom-center",
          id: toastId,
          duration: 3000,
        });
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col space-y-10 ">
      <div className="flex justify-between items-center px-8 py-5">
        <div className="text-white font-satoshi text-[30px] font-medium">
          BRIDGE
        </div>
      </div>
      <div className="flex flex-col space-y-6 px-8 w-full relative">
        <div className="h-[200px] bg-[#32363E] flex rounded-2xl justify-between px-6 pt-5 pb-3">
          <div className="flex flex-col justify-between h-full">
            <div className="flex space-x-5 items-center">
              <div className="bg-white py-2 px-2 rounded-full">
                <Image
                  src={
                    chain.chainName === "OPBNB"
                      ? "/opBnbChain.png"
                      : "/bnbChain.png"
                  }
                  alt="token"
                  width={100}
                  height={100}
                  className="w-[35px] h-[35px]"
                />
              </div>
              <div className="text-[22px] text-gray-300 tracking-wide font-satoshi font-medium">
                {chain.chainName === "OPBNB" ? "OPBNB" : "BSC"}
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
              // onClick={() => {
              //   setTokenOneAmount(
              //     chain.chainName === "OPBNB"
              //       ? opBnBtokenOne.balance
              //       : bnBtokenOne.balance,
              //   );
              // }}
              className="text-white px-2 py-2 text-[20px] cursor-pointer"
            >
              MAX{" "}
              {chain.chainName === "OPBNB"
                ? opBnbTokens.tokens[1].balance.toFixed(6)
                : bnbTokens.tokens[1].balance.toFixed(6)}
            </div>
            <div className="text-gray-400 text-[25px] mb-2">
              ~ $ {tokenOneAmount}
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
                    chain.chainName !== "OPBNB"
                      ? "/opBnbChain.png"
                      : "/bnbChain.png"
                  }
                  alt="token"
                  width={100}
                  height={100}
                  className="w-[35px] h-[35px]"
                />
              </div>
              <div className="text-[22px] text-gray-300 tracking-wide font-satoshi font-medium">
                {chain.chainName === "OPBNB" ? "BSC" : "OPBNB"}
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
              ~ $ {tokenTwoAmount}
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
            onClick={handleBridge}
            className="hover:bg-[#F3EF52] bg-[#F3EF52] rounded-2xl w-1/2 h-[100px] text-[30px] font-satoshi text-black font-medium "
          >
            BRIDGE
          </Button>
        )}
      </div>
    </div>
  );
};

export default Bridge;
