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

const Wallet = async () => {
  /// get session id from email
  /// get address from db
  /// if address empty redirect to create otherwise wallet

  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const id = session?.user.id;

  // const add: string[] = [];
  const wallet: any = await getWalletById(id);
  console.log(wallet);

  if (wallet.length === 0) {
    redirect("/create");
  }

  const accountService: AccountService = await getAccountService(wallet[0]);

  const balance = await accountService.getBalance();
  console.log(balance);

  const owner = await accountService.getPassKeyOwner();
  console.log(owner);
  const addressOwner = await accountService.getAddressOwner();
  console.log(addressOwner);

  return (
    <div className="flex flex-col justify-center w-full h-screen items-center">
      <div className="flex flex-col space-y-5">
        <div className="flex space-x-3 justify-center">
          <div> Account Address: </div>
          <div>{accountService.address}</div>
        </div>

        <div className="flex space-x-3 justify-center">
          <div>Balance: </div>
          <div>{balance._hex}</div>
        </div>

        <div className="flex space-x-3 justify-center">
          <div>PassKey Owner details: </div>
          <div>
            <span>PubKeyX: {owner.pubKeyX._hex}</span>
            <br />
            <span>PubKeyY: {owner.pubKeyY._hex}</span>
            <br />
            <span>KeyId: {owner.keyId}</span>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
