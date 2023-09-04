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
      <div className="w-full max-h-screen h-screen bg-[#14151A] md:block hidden">
        <div className="flex flex-col h-full">
          <div className="h-1/6">
            <Header image={session.user.image!} />
          </div>
          <div className="w-full h-5/6 pt-[4vh] pb-[3vh] flex px-12 space-x-6">
            <div className="w-3/4 h-full">
              <Tabs
                image={session.user.image!}
                address={wallet[0]}
                pubKeyX={pubKeyX._hex}
                pubKeyY={pubKeyY._hex}
                keyId={keyId}
              />
            </div>
            <div className="w-1/4 h-full">
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
      <div className="md:hidden flex flex-col h-screen justify-center items-center px-12">
        {/* <Header image={session.user.image!} />
        <div className="w-full my-20">
          <Tabs
            image={session.user.image!}
            address={wallet[0]}
            pubKeyX={pubKeyX._hex}
            pubKeyY={pubKeyY._hex}
            keyId={keyId}
          />
        </div>
        <div className="flex flex-col">
          <Portfolio
            address={wallet[0]}
            pubKeyX={pubKeyX._hex}
            pubKeyY={pubKeyY._hex}
            keyId={keyId}
          />
        </div> */}
        Interface only available in Desktop right now. Mobile interface coming
        soon.
      </div>
    </div>
  );
};

export default Wallet;
