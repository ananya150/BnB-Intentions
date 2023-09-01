"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { PreDeployedAccount } from "../../services/passkeyService";
import { useRouter } from "next/navigation";
import { BiLoaderCircle } from "react-icons/bi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const CreateAccount = ({
  userId,
  credId,
}: {
  userId: string;
  credId: string[];
}) => {
  const router = useRouter();
  console.log(userId);
  const [loading, setLoading] = useState(false);
  const [someErrorOccured, setSomeErrorOccured] = useState(false);

  const createPassKey = async () => {
    try {
      setLoading(true);
      console.log("Creating an account");
      const preDeployedAccount = new PreDeployedAccount();
      const resp = await preDeployedAccount.register("testAccount");
      if (resp === null) {
        setSomeErrorOccured(true);
        setLoading(false);
        return;
      }
      console.log("Wallet deployed");
      router.push("/wallet");
    } catch (e) {
      console.log(e);
      setLoading(false);
      setSomeErrorOccured(true);
    }
  };

  const logout = async () => {
    try {
      await signOut();
    } catch (e) {
      toast.error("Something went wrong");
      console.error(e);
    }
  };

  const dialog = (
    <Dialog open={someErrorOccured}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent
        className="sm:max-w-[425px]"
        onEscapeKeyDown={() => {
          setSomeErrorOccured(false);
        }}
      >
        <DialogHeader>
          <DialogTitle>Failed to deploy</DialogTitle>
          <DialogDescription className="py-3">
            Some Error Occured while deploying you account.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );

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
              Welcome
            </span>
            <span className="text-white text-[24px] font-satoshi ">
              Looks like you are new here. Let's start by creating a passkey!
            </span>
          </div>
        </div>
        <div className="pr-10 h-1/2 flex flex-col justify-top items-center pt-10">
          {loading ? (
            <Button
              variant="secondary"
              className="h-[60px] w-[300px] rounded-xl hover:bg-[#fff699]"
            >
              <span className="w-[250px] text-[17px] font-satoshi">
                Deploying your account
              </span>
              <BiLoaderCircle className="animate-spin w-6 h-6" />
            </Button>
          ) : (
            <Button
              onClick={createPassKey}
              variant="secondary"
              className="h-[60px] w-[300px] rounded-xl hover:bg-[#fff699]"
            >
              <span className="w-[300px] text-[17px] font-satoshi">
                Create PassKey
              </span>
            </Button>
          )}
        </div>
        {dialog}
      </div>
    </div>
  );
};

export default CreateAccount;
