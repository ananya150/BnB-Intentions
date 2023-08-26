import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../lib/auth";
import Image from "next/image";
import { FaRobot } from "react-icons/fa";
import { AiOutlineSwap } from "react-icons/ai";
import { PiBridge } from "react-icons/pi";

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="w-full">
      <div className="py-5 px-12 flex justify-between w-full items-center">
        <div>
          <span className="text-[#FFE900] font-semibold text-[50px] font-satoshi">
            OpIntents
          </span>
        </div>
        <div className="flex items-center space-x-4">
          {/* <div className='rounded-xl text-[15px] bg-[#FFE900] px-3 py-1 flex flex-col items-center justify-center'>Chat</div>
                <div className='rounded-xl text-[15px] bg-[#FFE900] px-3 py-1 flex flex-col items-center justify-center'>Transfer</div>
                <div className='rounded-xl text-[15px] bg-[#FFE900] px-3 py-1 flex flex-col items-center justify-center'>Swap</div>
                <div className='rounded-xl text-[15px] bg-[#FFE900] px-3 py-1 flex flex-col items-center justify-center'>Bridge</div> */}
        </div>
        <div className="flex space-x-20 items-center">
          <div className="flex space-x-6 items-center">
            <div className="rounded-2xl text-[14px] px-3 py-1 bg-[#FFE900] flex flex-col items-center justify-center">
              <div className="flex space-x-3 items-center">
                <FaRobot className="w-4 h-4" />
                <span className="font-satoshi">Chat</span>
              </div>
            </div>
            <div className="rounded-2xl text-[14px] px-3 py-1 border border-gray-600 flex flex-col items-center justify-center">
              <div className="flex space-x-3 items-center">
                <AiOutlineSwap className="w-4 h-4 text-white" />
                <span className="text-white font-satoshi">Swap</span>
              </div>
            </div>
            <div className="rounded-2xl text-[14px] px-3 py-1 border border-gray-600 flex flex-col items-center justify-center">
              <div className="flex space-x-3 items-center">
                <PiBridge className="w-4 h-4 text-white" />
                <span className="text-white font-satoshi">Bridge</span>
              </div>
            </div>
          </div>
          <div className="">
            <Image
              src={session?.user.image!}
              alt="Profile"
              height={60}
              width={60}
              className="rounded-full w-[50px] h-[50px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
