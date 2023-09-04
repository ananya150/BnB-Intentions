"use client";
import React, { useEffect } from "react";
import Chart from "./Chart";
import Link from "next/link";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { BiSolidCopy } from "react-icons//bi";
import Image from "next/image";
import { decrement, increment, reset } from "../../redux/features/counterSlice";
import { setAccount, AccountSlice } from "../../redux/features/accountSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Balances from "./Balances";

interface props {
  address: string;
  pubKeyX: string;
  pubKeyY: string;
  keyId: string;
}

const Portfolio = ({ address, pubKeyX, pubKeyY, keyId }: props) => {
  const [copied, setCopied] = useState(false);
  const [width, setWidth] = useState(0);

  const dispatch = useAppDispatch();
  const chain = useAppSelector((state) => state.chainSlice);

  useEffect(() => {
    const state: AccountSlice = {
      address: address,
      pubKeyX: pubKeyX,
      pubKeyY: pubKeyY,
      keyId: keyId,
    };
    dispatch(setAccount(state));
    console.log("Window idth");
    setWidth(window.innerWidth);
  }, []);

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const copyAddress = async () => {
    setCopied(true);
    navigator.clipboard.writeText(address);
    await delay(2000);
    setCopied(false);
  };

  return (
    <div>
      <div className="hidden md:block h-[76vh]">
        <div className="h-full w-full bg-[#F3EF52] rounded-2xl py-[1.2vw] px-[1vw] flex flex-col space-y-2 ">
          <div className="min-h-[32vh] flex flex-col justify-between">
            <div className="">
              <span className="text-black text-[2vw] tracking-wide font-medium font-satoshi w-full">
                Portfolio
              </span>
            </div>
            <div className="flex justify-between items-center">
              <Link
                href={`${
                  chain.chainName === "OPBNB"
                    ? `https://opbnbscan.com/address/${address}`
                    : `https://testnet.bscscan.com/address/${address}`
                }`}
                target="_blank"
                className=""
              >
                <span className="text-black text-[1.2vw] tracking-wide font-satoshi hover:text-blue-600">
                  {address.slice(0, 8)}......{address.slice(-5)}
                </span>
              </Link>
              <div className="cursor-pointer" onClick={copyAddress}>
                {copied ? (
                  <FaCheck className="h-3 w-3" />
                ) : (
                  <BiSolidCopy className="h-4 w-4" />
                )}
              </div>
            </div>
            <div className="flex justify-center ">
              <Chart width={width / 5} height={width / 10} />
            </div>
          </div>
          <div className="h-7/12 mt-[1vw]">
            <Balances
              address={address}
              pubKeyX={pubKeyX}
              pubKeyY={pubKeyY}
              keyId={keyId}
            />
          </div>
        </div>
      </div>
      <div className="md:hidden pb-4">
        <div className="mx-4 bg-[#F3EF52] rounded-2xl py-4 px-4  flex flex-col space-y-2">
          <div className="w-full text-center text-black text-[18px] tracking-wide font-medium font-satoshi">
            Portfolio
          </div>
          <div className="pt-4 flex justify-between items-center">
            <Link href="#" className="">
              <span className="text-black text-[12px] tracking-wide font-satoshi hover:text-blue-600">
                {address.slice(0, 8)}......{address.slice(-5)}
              </span>
            </Link>
            <div className="cursor-pointer" onClick={copyAddress}>
              {copied ? (
                <FaCheck className="md:h-4 md:w-4 h-3 w-3" />
              ) : (
                <BiSolidCopy className="md:h-5 md:w-5 h-4 w-4" />
              )}
            </div>
          </div>
          <div className="">
            <Balances
              address={address}
              pubKeyX={pubKeyX}
              pubKeyY={pubKeyY}
              keyId={keyId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
