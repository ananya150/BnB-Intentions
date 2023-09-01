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

  const dispatch = useAppDispatch();

  useEffect(() => {
    const state: AccountSlice = {
      address: address,
      pubKeyX: pubKeyX,
      pubKeyY: pubKeyY,
      keyId: keyId,
    };
    dispatch(setAccount(state));
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
    <div className="h-full w-full bg-[#F3EF52] rounded-2xl py-6 px-6 flex flex-col ">
      <div>
        <div className="">
          <span className="text-black text-[32px] tracking-wide font-medium font-satoshi w-full">
            Portfolio
          </span>
        </div>
        <div className="pt-4 flex justify-between items-center">
          <Link href="#" className="">
            <span className="text-black text-[20px] tracking-wide font-satoshi hover:text-blue-600">
              {address.slice(0, 8)}......{address.slice(-5)}
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
        <div>
          <Chart width={400} height={200} />
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
  );
};

export default Portfolio;
