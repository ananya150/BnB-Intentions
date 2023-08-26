"use client";
import React from "react";
import Chart from "./Chart";
import Link from "next/link";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { BiSolidCopy } from "react-icons//bi";
import Image from "next/image";

const Portfolio = () => {
  const address = "0xEf351a3440ab4144554286BF7830Dc3E1200Cb17";
  const [copied, setCopied] = useState(false);

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
    <div className="h-full w-full bg-[#F3EF52] rounded-2xl py-6 px-6 flex flex-col">
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
      {/* <div className='py-6'>
            <span className='text-black text-[25px] tracking-wide font-medium font-satoshi w-full'>$365.76</span>
        </div> */}
      <div>
        <Chart width={400} height={200} />
      </div>
      <div className="py-[50px] flex flex-col space-y-11">
        <div className="flex justify-between items-center">
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
              <div>BNB</div>
              <div>1.3</div>
            </div>
          </div>
          <div>$273.18</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            <Image
              src="/Busd.png"
              alt="logo"
              height={100}
              width={100}
              className="w-[65px] h-[65px]"
            />
            <div className="flex flex-col justify-between">
              <div>BUSD</div>
              <div>16</div>
            </div>
          </div>
          <div>$16</div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
