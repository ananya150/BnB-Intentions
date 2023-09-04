"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { PreDeployedAccount } from "../../services/passkeyService";
import { useRouter } from "next/navigation";
import { BiLoaderCircle } from "react-icons/bi";

const CreateAccount = ({ userId, name }: { userId: string; name: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [walletDeploymentRes, setWalletDeploymentRes] = useState<null | string>(
    null,
  );

  const createPassKey = async () => {
    const toastId = toast.loading(`Deploying your account`, {
      position: "bottom-center",
    });
    try {
      setLoading(true);
      const preDeployedAccount = new PreDeployedAccount();
      const resp = await preDeployedAccount.register(name, userId);
      console.log("Wallet deployed");
      toast.success("Wallet Created", {
        position: "bottom-center",
        id: toastId,
        duration: 3000,
      });
      setLoading(false);
      setWalletDeploymentRes("success");
    } catch (e) {
      console.log(e);
      setLoading(false);
      toast.error("Something went wrong, Try reloading the window", {
        position: "bottom-center",
        id: toastId,
        duration: 5000,
      });
      setLoading(false);
      setWalletDeploymentRes("fail");
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

  const route = async () => {
    setLoading(true);
    router.push("/wallet");
  };

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
          {walletDeploymentRes === null ? (
            loading ? (
              <Button
                variant="secondary"
                className="h-[60px] w-[300px] rounded-xl hover:bg-[#F3EF52] bg-[#fff699]"
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
                className="h-[60px] w-[300px] rounded-xl hover:bg-[#F3EF52] bg-[#fff699]"
              >
                <span className="w-[300px] text-[17px] font-satoshi">
                  Create PassKey
                </span>
              </Button>
            )
          ) : walletDeploymentRes === "fail" ? (
            <Button
              variant="secondary"
              className="h-[60px] w-[300px] rounded-xl hover:bg-[#F3EF52] bg-[#fff699]"
            >
              <span className="w-[250px] text-[17px] font-satoshi">Failed</span>
            </Button>
          ) : (
            <Button
              onClick={route}
              variant="secondary"
              className="h-[60px] w-[300px] rounded-xl hover:bg-[#F3EF52] bg-[#fff699]"
            >
              {loading ? (
                <BiLoaderCircle className="animate-spin w-6 h-6" />
              ) : (
                <span className="w-[300px] text-[17px] font-satoshi">
                  Explore wallet
                </span>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
