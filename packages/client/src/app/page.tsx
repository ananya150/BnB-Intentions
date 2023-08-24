import React from "react";
import { Button } from "../components/ui/button";
import Card from "../components/home/card";
import { db } from "../lib/db";
import SignInButton from "../components/home/signInButton";

const cards = [
  {
    heading: "AI powered Intents",
    info: "Just specify your intents and let AI and Experts find the best route.",
  },
  {
    heading: "Cross-chain",
    info: "Move your funds across the BNB ecosystem within seconds.",
  },
  {
    heading: "Account Abstraction",
    info: "Experience  passkeys, gas abstraction, etc for the best user experience.",
  },
  {
    heading: "Non-Custodial Wallet",
    info: "Own you assets. No need to trust any third party for good user experience.",
  },
];

const Home = () => {


  return (
    <div className="flex h-screen bg-[#14151A]">
      <div className="w-1/2 h-full flex flex-col justify-center items-center">
        <video autoPlay loop muted className="w-2/3" src="/banner-video.mp4" />
      </div>
      <div className="w-1/2 h-full flex flex-col ">
        <div className="h-1/2">
          <div className="w-full flex flex-col justify-center items-end h-1/4 pr-10">
            <SignInButton />
          </div>
          <div className="pr-10 h-3/4 flex flex-col justify-center space-y-10 text-center">
            <span className="text-[#FFE900] font-semibold text-[70px] font-satoshi">
              OpIntents
            </span>
            <span className="text-white text-[24px] font-satoshi ">
              The most advanced and user-friendly wallet for BnB ecosystem
            </span>
          </div>
        </div>
        <div className="pr-10 h-1/2 flex flex-col justify-center space-y-4">
          <div className="flex space-x-4 w-full">
            <div className="w-1/2">
              <Card heading={cards[0].heading} info={cards[0].info} />
            </div>
            <div className="w-1/2">
              <Card heading={cards[2].heading} info={cards[2].info} />
            </div>
          </div>
          <div className="flex space-x-4 w-full">
            <div className="w-1/2">
              <Card heading={cards[1].heading} info={cards[1].info} />
            </div>
            <div className="w-1/2">
              <Card heading={cards[3].heading} info={cards[3].info} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
