import React from "react";
import CreateAccount from "../../components/create/CreateAccount";

const Create = () => {
  /// get userId from sessin
  /// get credId from db

  /// if credId exists directly deploy
  /// if dont setup passkey

  /// after everything save account adress and push to wallet page

  const userId = "";
  const credId: string[] = [];

  return (
    <div>
      <CreateAccount userId={userId} credId={credId} />
    </div>
  );
};

export default Create;
