import React from "react";
import CreateAccount from "../../components/create/CreateAccount";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { notFound, redirect } from "next/navigation";
import { getWalletById } from "../../utils/getDb";

const Create = async () => {
  /// get userId from sessin
  /// get credId from db

  /// if credId exists directly deploy
  /// if dont setup passkey

  /// after everything save account adress and push to wallet page

  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const userId = session?.user.id;

  // const add: string[] = [];
  const wallet: any = await getWalletById(userId);

  if (wallet.length !== 0) {
    redirect("/wallet");
  }

  return (
    <div>
      <div className="hidden md:block">
        <CreateAccount userId={userId} name={session.user.name!} />
      </div>
      <div className="md:hidden flex flex-col h-screen justify-center items-center px-12">
        Interface only available in Desktop right now. Mobile interface coming
        soon.
      </div>
    </div>
  );
};

export default Create;
