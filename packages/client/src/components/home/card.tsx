import React from "react";
// import { ArrowBigDown } from 'lucide-react'
import { ImArrowUpRight2 } from "react-icons/im";
type props = {
  heading: string;
  info: string;
};

const Card = ({ heading, info }: props) => {
  return (
    <div className="bg-[#101016] hover:bg-[#1F2126] hover:cursor-pointer px-8 py-10 rounded-2xl group  duration-500">
      <div className="flex space-x-3 items-center">
        <span className="text-white text-[25px] font-sans">{heading}</span>
        <ImArrowUpRight2 className="text-white font-semibold group-hover:translate-x-1 group-hover:-translate-y-1 " />
      </div>
      <div className="mt-4">
        <span className="text-gray-400 font-satoshi">{info}</span>
      </div>
    </div>
  );
};

export default Card;
