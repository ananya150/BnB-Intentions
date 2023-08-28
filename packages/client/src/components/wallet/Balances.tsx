import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  AccountService,
  getAccountService,
} from "../../services/passkeyService";
import { ethers } from "ethers";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchTokens } from "../../redux/features/balanceSlice";
import { BiLoaderCircle } from "react-icons/bi";
interface props {
  address: string;
  pubKeyX: string;
  pubKeyY: string;
  keyId: string;
}

const Balances = ({ address, pubKeyX, pubKeyY, keyId }: props) => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.tokens);
  const account = useAppSelector((state) => state.accountSlice);
  const [accountService, setAccountService] = useState<AccountService | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getBalnce = async () => {
      setLoading(true);
      const account = getAccountService(address, pubKeyX, pubKeyY, keyId);
      setAccountService(account);
      const balances = await account.getBalances();
      await dispatch(fetchTokens(balances));
      setLoading(false);
    };
    getBalnce();
  }, []);

  const requestFunds = async () => {
    setLoading(true);
    await accountService?.airdrop();
    const balances = await accountService?.getBalances();
    await dispatch(fetchTokens(balances!));
    setLoading(false);
  };

  return (
    <div className="flex flex-col space-y-9">
      <div className="pt-[50px] flex flex-col space-y-11 mr-5">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            <div className="bg-black rounded-full w-[65px] h-[65px] py-3 px-3">
              <Image
                src="/Bnb2.png"
                alt="logo"
                height={80}
                width={80}
                className="w-[42px] h-[42px]"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div className="text-[20px] font-sans">BNB</div>
              <div>{tokens.tokens[0].balance}</div>
            </div>
          </div>
          <div className="font-satoshi text-[27px] font-medium">
            ${(tokens.tokens[0].balance * tokens.tokens[0].price).toFixed(2)}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            <Image
              src="/Busd.png"
              alt="logo"
              height={100}
              width={100}
              className="w-[65px] h-[65px]"
            />
            <div className="flex flex-col justify-between">
              <div className="text-[20px] font-sans">BUSD</div>
              <div>{tokens.tokens[1].balance}</div>
            </div>
          </div>
          <div className="font-satoshi text-[27px] font-medium">
            ${(tokens.tokens[1].balance * tokens.tokens[1].price).toFixed(2)}
          </div>
        </div>
      </div>
      <div className="text-[13px] font-satoshi">
        This wallet is a proof of concept for Intents Architecture with Account
        Abstraction and is meant for testing purposes only.
      </div>
      <div className="w-full flex justify-center">
        {loading ? (
          <button className="w-2/3 rounded-3xl py-4 text-white bg-black flex justify-center">
            <BiLoaderCircle className="text-white animate-spin w-6 h-6" />
          </button>
        ) : (
          <button
            onClick={requestFunds}
            className="w-2/3 rounded-3xl py-4 text-white bg-black"
          >
            REQUEST FUNDS
          </button>
        )}
      </div>
    </div>
  );
};

export default Balances;
