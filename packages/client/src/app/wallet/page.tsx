import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { notFound, redirect } from "next/navigation";
import { getWalletById } from "../../utils/getDb";
import CreateAccount from "../../components/create/CreateAccount";
import {
  getAccountService,
  AccountService,
} from "../../services/passkeyService";
import Send from "../../components/wallet/Send";
import Header from "../../components/wallet/Header";
import ChatBot from "../../components/wallet/Chat";
import Portfolio from "../../components/wallet/Portfolio";
import { getPassKeyFromAddress } from "@opintents/shared";
import { ethers } from "ethers";

const Wallet = async () => {
  /// get session id from email
  /// get address from db
  /// if address empty redirect to create otherwise wallet

  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const id = session?.user.id;

  // // const add: string[] = [];
  const wallet: any = await getWalletById(id);
  console.log(wallet);

  if (wallet.length === 0) {
    redirect("/create");
  }
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545/",
  );
  const {pubKeyX, pubKeyY, keyId} = await getPassKeyFromAddress(wallet[0], provider);

  return (
    <div className="w-full h-screen bg-[#14151A]">
      <div className="flex flex-col h-full">
        <Header />
        <div className="w-full h-full pt-12 pb-8 flex px-12 space-x-6">
          <div className="w-3/4 bg-[#27292F] rounded-2xl">
            <ChatBot image={session.user.image!} />
          </div>
          <div className="w-1/4">
            <Portfolio address={wallet[0]} pubKeyX={pubKeyX._hex} pubKeyY={pubKeyY._hex} keyId={keyId}  />
          </div>
        </div>
      </div>
    </div>
  );
  // <Send address={add} balance={balance._hex} />;
};

export default Wallet;
