import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { notFound, redirect } from "next/navigation";
import { getWalletById } from "../../utils/getDb";
import Header from "../../components/wallet/Header";
import Portfolio from "../../components/wallet/Portfolio";
import Tabs from "../../components/wallet/Tabs";
import { getPassKey } from "../../services/passkeyService";

const Wallet = async () => {
  /// get session id from email
  /// get address from db
  /// if address empty redirect to create otherwise wallet

  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const id = session?.user.id;

  // const add: string[] = [];
  const wallet: any = await getWalletById(id);

  if (wallet.length === 0) {
    redirect("/create");
  }

  const { pubKeyX, pubKeyY, keyId } = await getPassKey(wallet[0]);

  return (
    <div>
      <div className="w-full h-screen bg-[#14151A] md:block hidden">
        <div className="flex flex-col h-full">
          <Header image={session.user.image!} />
          <div className="w-full h-full pt-12 pb-8 flex px-12 space-x-6">
            <div className="w-3/4">
              <Tabs
                image={session.user.image!}
                address={wallet[0]}
                pubKeyX={pubKeyX._hex}
                pubKeyY={pubKeyY._hex}
                keyId={keyId}
              />
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
      <div className="md:hidden w-full bg-[#14151A]">
        <Header image={session.user.image!} />
        <div className="flex flex-col">
          <Portfolio
            address={wallet[0]}
            pubKeyX={pubKeyX._hex}
            pubKeyY={pubKeyY._hex}
            keyId={keyId}
          />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
