import React from "react";
import { Button } from "../ui/button";

const Bridge = () => {
  return (
    <div className="w-full h-full flex flex-col space-y-10 ">
      <div className="flex justify-between items-center px-8 py-5">
        <div className="text-white font-satoshi text-[30px] font-medium">
          BRIDGE
        </div>
      </div>
      <div className="flex flex-col space-y-6 px-8 w-full">
        <div className="h-[200px] bg-[#32363E] rounded-2xl"></div>
        <div className="h-[200px] bg-[#32363E] rounded-2xl"></div>
      </div>
      <div className="px-8 flex justify-center">
        <Button className="hover:bg-[#F3EF52] bg-[#232A4B] rounded-2xl w-1/2 h-[100px] text-[30px] font-satoshi hover:text-black text-white font-medium ">
          BRIDGE
        </Button>
      </div>
    </div>
  );
};

export default Bridge;
