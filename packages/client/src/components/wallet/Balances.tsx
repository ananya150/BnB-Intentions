import React from 'react'
import Image from 'next/image'

const Balances = () => {
  return (
    <div className="pt-[50px] flex flex-col space-y-11 mr-5">
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
            <div className="text-[20px] font-sans">BNB</div>
            <div>1.3</div>
            </div>
        </div>
        <div className="font-satoshi text-[27px] font-medium">$273.18</div>
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
            <div className="text-[20px] font-sans">BUSD</div>
            <div>16</div>
            </div>
        </div>
        <div className="font-satoshi text-[27px] font-medium">$16</div>
        </div>
    </div>
  )
}

export default Balances