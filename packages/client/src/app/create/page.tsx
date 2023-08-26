import React from "react";
import CreateAccount from "../../components/create/CreateAccount";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { notFound, redirect } from "next/navigation";

const Create = async () => {
  /// get userId from sessin
  /// get credId from db

  /// if credId exists directly deploy
  /// if dont setup passkey

  /// after everything save account adress and push to wallet page

  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const userId = session?.user.id;

  const credId: string[] = [];

  return (
    <div>
      <CreateAccount userId={userId} credId={credId} />
    </div>
  );
};

export default Create;
