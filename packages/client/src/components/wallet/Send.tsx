"use client";
import React, { useEffect, useState } from "react";
import {
  AccountService,
  getAccountService,
} from "../../services/passkeyService";
import { signOut } from "next-auth/react";

const Send = ({ address, balance }: { address: string; balance: string }) => {
  console.log(balance);
  const [userOP, setUserOp] = useState<any>({ signature: "abcd" });
  const [count, setCount] = useState(0);
  const [bal, setBal] = useState("0");

  const [to, setTo] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    setBal(balance);
  }, [count]);

  const logout = async () => {
    await signOut();
  };

  const createuserOP = async () => {
    const accountService: AccountService = await getAccountService(address);
    const txResponse = await accountService.execute(to, value, "0x");
    console.log(txResponse.hash);
    await updateBalance();
  };

  const updateBalance = async () => {
    const accountService: AccountService = await getAccountService(address);
    const balance = await accountService.getBalance();
    setBal(balance._hex);
  };

  return (
    <div className="flex flex-col justify-center w-full h-screen items-center">
      <div className="flex flex-col space-y-5">
        <div className="flex space-x-3 justify-center">
          <div> Account Address: </div>
          <div>{address}</div>
        </div>

        <div className="flex space-x-3 justify-center">
          <div>Balance: </div>
          {/* <div>{bal}</div> */}
          <div>{parseInt(bal, 16) / 10 ** 18}</div>
        </div>

        {/* <div className="flex space-x-3 justify-center">
          <div>PassKey Owner details: </div>
          <div>
            <span>PubKeyX: {owner.pubKeyX._hex}</span>
            <br />
            <span>PubKeyY: {owner.pubKeyY._hex}</span>
            <br />
            <span>KeyId: {owner.keyId}</span>
            <br />
          </div>
        </div> */}

        <div className="flex flex-col space-y-3">
          <div className="flex flex-col space-y-4 mt-10">
            <div className="flex space-x-4">
              <span>Enter Address</span>
              <input
                className="border w-[500px]"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                }}
              ></input>
            </div>
            <div className="flex space-x-4">
              <span>Enter Value</span>
              <input
                className="border"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              ></input>
            </div>
            <button onClick={createuserOP}>Create UserOp</button>
            <br />
            <button onClick={logout}>SignOut</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Send;
