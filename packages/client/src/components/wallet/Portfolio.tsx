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
  address: string,
  pubKeyX: string,
  pubKeyY: string,
  keyId: string
}

const Portfolio = ({address, pubKeyX, pubKeyY, keyId}: props) => {
  const [copied, setCopied] = useState(false);

  const account = useAppSelector((state) => state.accountSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const state: AccountSlice = {
      address: address,
      pubKeyX: pubKeyX,
      pubKeyY: pubKeyY,
      keyId: keyId
    }
    dispatch(setAccount(state))
  },[])

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
    <div className="h-full w-full bg-[#F3EF52] rounded-2xl py-6 px-6 flex flex-col justify-between">
      <div>
        <div className="">
          <span className="text-black text-[32px] tracking-wide font-medium font-satoshi w-full">
            Portfolio
          </span>
        </div>
        <div className="pt-4 flex justify-between items-center">
          <Link href="#" className="">
            <span className="text-black text-[20px] tracking-wide font-satoshi hover:text-blue-600">
              {account.address.slice(0, 8)}......{account.address.slice(-5)}
            </span>
          </Link>
          <div className="cursor-pointer" onClick={copyAddress}>
            {copied ? (
              <FaCheck className="h-4 w-4" />
            ) : (
              <BiSolidCopy className="h-5 w-5" />
            )}
          </div>
        </div>
        {/* <div className='py-6'>
                    <span className='text-black text-[25px] tracking-wide font-medium font-satoshi w-full'>$365.76</span>
                </div> */}
        <div>
          <Chart width={400} height={200} />
        </div>
        <div>
            <Balances/>
        </div>
      </div>
      <div className="flex flex-col space-y-8">
        <div className="text-[13px] font-satoshi">
          This wallet is a proof of concept for Intents Architecture with
          Account Abstraction and is meant for testing purposes only.
        </div>
        <div className="w-full flex justify-center">
          <button
            onClick={() => dispatch(increment())}
            className="w-2/3 rounded-3xl py-4 text-white bg-black"
          >
            REQUEST FUNDS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
