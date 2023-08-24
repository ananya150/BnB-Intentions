import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { notFound, redirect } from "next/navigation";
import { getAddressById, getCredIdbyId } from "../../utils/getDb";
import CreateAccount from "../../components/create/CreateAccount";

const Wallet = async () => {
  /// get session id from email
  /// get address from db
  /// if address empty redirect to create otherwise wallet

  // const session = await getServerSession(authOptions);
  // if(!session) notFound()
  // const id = session?.user.id;

  // const add = await getAddressById(id);
  // console.log(add)

  const add: string[] = [];
  if (add.length === 0) {
    redirect("/create");
  }

  return <div>Found</div>;
};

export default Wallet;
