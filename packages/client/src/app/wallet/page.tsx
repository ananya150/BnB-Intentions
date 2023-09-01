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
import TabItems from "../../components/wallet/TabsItems";
import Tabs from "../../components/wallet/Tabs";
import { getPassKey } from "../../services/passkeyService";

const Wallet = async () => {
  /// get session id from email
  /// get address from db
  /// if address empty redirect to create otherwise wallet

  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const id = session?.user.id;
  console.log(id);

  // const add: string[] = [];
  const wallet: any = await getWalletById(id);
  console.log(wallet);

  if (wallet.length === 0) {
    redirect("/create");
  }

  const { pubKeyX, pubKeyY, keyId } = await getPassKey(wallet[0]);
  console.log(pubKeyX);

  return (
    <div className="w-full h-screen bg-[#14151A]">
      <div className="flex flex-col h-full">
        <Header />
        <div className="w-full h-full pt-12 pb-8 flex px-12 space-x-6">
          <div className="w-3/4">
            <Tabs image={session.user.image!} />
          </div>
          <div className="w-1/4">
            <Portfolio
              address={wallet[0]}
              pubKeyX={pubKeyX._hex}
              pubKeyY={pubKeyY._hex}
              keyId={keyId}
            />
          </div>
        </div>
      </div>
    </div>
  );
  // <Send address={add} balance={balance._hex} />;
};

export default Wallet;
