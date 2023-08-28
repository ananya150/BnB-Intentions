"use client";
import React from "react";
import { FaRobot } from "react-icons/fa";
import { AiOutlineSwap } from "react-icons/ai";
import { PiBridge } from "react-icons/pi";
import { GoHistory } from "react-icons/go";

const TabItems = ({ tab, setTab }: { tab: string; setTab: any }) => {
  return (
    <div className="flex justify-end absolute top-10 left-[50vw] ">
      <div className="flex space-x-6 items-center">
        <div
          onClick={() => setTab("chat")}
          className={`duration-500 rounded-2xl text-[14px] px-3 py-1 flex flex-col items-center justify-center cursor-pointer ${
            tab === "chat"
              ? "bg-[#FFE900] border border-[#FFE900] text-black"
              : "border border-gray-600 text-white"
          }`}
        >
          <div className="flex space-x-3 items-center">
            <FaRobot className="w-4 h-4" />
            <span className="font-satoshi">Chat</span>
          </div>
        </div>
        <div
          onClick={() => setTab("swap")}
          className={`duration-500 rounded-2xl text-[14px] px-3 py-1 flex flex-col items-center justify-center cursor-pointer ${
            tab === "swap"
              ? "bg-[#FFE900] text-black border border-[#FFE900]"
              : "border border-gray-600 text-white"
          }`}
        >
          <div className="flex space-x-3 items-center">
            <AiOutlineSwap className="w-4 h-4 " />
            <span className="font-satoshi">Swap</span>
          </div>
        </div>
        <div
          onClick={() => setTab("bridge")}
          className={`duration-500 rounded-2xl text-[14px] px-3 py-1 flex flex-col items-center justify-center cursor-pointer ${
            tab === "bridge"
              ? "bg-[#FFE900] text-black border border-[#FFE900]"
              : "border border-gray-600 text-white"
          }`}
        >
          <div className="flex space-x-3 items-center">
            <PiBridge className="w-4 h-4 " />
            <span className="font-satoshi">Bridge</span>
          </div>
        </div>
        <div
          onClick={() => setTab("history")}
          className={`duration-500 rounded-2xl text-[14px] px-3 py-1 flex flex-col items-center justify-center cursor-pointer ${
            tab === "history"
              ? "bg-[#FFE900] text-black border border-[#FFE900]"
              : "border border-gray-600 text-white"
          }`}
        >
          <div className="flex space-x-3 items-center">
            <GoHistory className="w-4 h-4 " />
            <span className="font-satoshi">History</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabItems;
