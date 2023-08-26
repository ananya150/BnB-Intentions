"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { PreDeployedAccount } from "../../services/passkeyService";
import { useRouter } from "next/navigation";

const CreateAccount = ({
  userId,
  credId,
}: {
  userId: string;
  credId: string[];
}) => {
  const router = useRouter();
  console.log(userId);
  const [credIdSetUp, setCredIdSetUp] = useState<boolean>(credId.length !== 0);

  const createPassKey = async () => {
    console.log("Creating an account");
    const preDeployedAccount = new PreDeployedAccount();
    const resp = await preDeployedAccount.register("testAccount");
    router.push("/wallet");
  };

  const deployAccount = async () => {
    setCredIdSetUp(false);
  };

  const logout = async () => {
    try {
      await signOut();
    } catch (e) {
      toast.error("Something went wrong");
      console.error(e);
    }
  };

  if (!credIdSetUp) {
    return (
      <div className="flex h-screen bg-[#14151A]">
        <div className="w-1/2 h-full flex flex-col justify-center items-center">
          <video
            autoPlay
            loop
            muted
            className="w-2/3"
            src="/banner-video.mp4"
          />
        </div>
        <div className="w-1/2 h-full flex flex-col space-y-10 ">
          <div className="h-1/2">
            <div className="w-full flex flex-col justify-center items-end h-1/4 pr-10">
              <Button onClick={logout} variant="secondary" size="lg">
                Sign out
              </Button>
            </div>
            <div className="pr-10 h-3/4 flex flex-col justify-end space-y-10 text-center">
              <span className="text-[#FFE900] font-semibold text-[70px] font-satoshi">
                Welcome
              </span>
              <span className="text-white text-[24px] font-satoshi ">
                Looks like you are new here. Let's start by creating a passkey!
              </span>
            </div>
          </div>
          <div className="pr-10 h-1/2 flex flex-col justify-top items-center pt-10">
            <Button
              onClick={createPassKey}
              variant="secondary"
              className="h-[60px] rounded-xl hover:bg-[#fff699]"
            >
              <span className="w-[200px] text-[17px] font-satoshi">
                Create PassKey
              </span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#14151A]">
      <div className="w-1/2 h-full flex flex-col justify-center items-center">
        <video autoPlay loop muted className="w-2/3" src="/banner-video.mp4" />
      </div>
      <div className="w-1/2 h-full flex flex-col space-y-10 ">
        <div className="h-1/2">
          <div className="w-full flex flex-col justify-center items-end h-1/4 pr-10">
            <Button onClick={logout} variant="secondary" size="lg">
              Sign out
            </Button>
          </div>
          <div className="pr-10 h-3/4 flex flex-col justify-end space-y-10 text-center">
            <span className="text-[#FFE900] font-semibold text-[70px] font-satoshi">
              Final Step..
            </span>
            <span className="text-white text-[24px] font-satoshi ">
              Great! Your passkey is setup. Let's deploy your account.
            </span>
          </div>
        </div>
        <div className="pr-10 h-1/2 flex flex-col justify-top items-center pt-10">
          <Button
            onClick={deployAccount}
            variant="secondary"
            className="h-[60px] rounded-xl hover:bg-[#fff699]"
          >
            <span className="w-[200px] text-[17px] font-satoshi">
              Deploy Account
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
