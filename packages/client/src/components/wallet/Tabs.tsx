"use client";
import React, { useState, useEffect } from "react";
import TabItems from "./TabsItems";
import ChatBot from "./Chat";
import Swap from "./Swap";
import Bridge from "./Bridge";
import History from "./History";
import axios from "axios";
import {
  getAccountService,
  OpBnbAccountService,
  BnbAccountService,
} from "../../services/passkeyService";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ConfirmTransfer from "./ConfirmTransfer";
import { fetchOpBnbTokens } from "../../redux/features/opBnBbalanceSlice";
import { fetchBnbTokens } from "../../redux/features/bnbBalanceSlice";
import ConfirmSwap from "./ConfirmSwap";
import ConfirmBridge from "./ConfirmBridge";

interface props {
  address: string;
  pubKeyX: string;
  pubKeyY: string;
  keyId: string;
  image: string;
}

const LoadingMessage: Message = {
  role: "assistant",
  content: "....",
};

interface TransferConfirmationState {
  open: boolean;
  assetName: string;
  to: string;
  amount: string;
}

const initialtransferConfirmationState: TransferConfirmationState = {
  open: false,
  amount: "",
  assetName: "",
  to: "",
};

interface SwapConfirmationState {
  open: boolean;
  fromAsset: string;
  toAsset: string;
  fromAmount: string;
  toAmount: string;
}

const initialSwapConfirmationState: SwapConfirmationState = {
  open: false,
  fromAsset: "",
  toAsset: "",
  fromAmount: "",
  toAmount: "",
};

interface BridgeConfirmationState {
  open: boolean;
  fromChain: string;
  toChain: string;
  busdAmount: string;
}

const initialBridgeConfirmationState: BridgeConfirmationState = {
  open: false,
  fromChain: "",
  toChain: "",
  busdAmount: "",
};

const Tabs = ({ address, pubKeyX, pubKeyY, keyId, image }: props) => {
  const [tab, setTab] = useState<string>("chat");
  const dispatch = useAppDispatch();

  const [messages, setMessages] = useState<Message[]>([]);
  const [accountServices, setAccountServices] = useState<accounts | null>(null);
  const chain = useAppSelector((state) => state.chainSlice);
  const [domLoaded, setDomLoaded] = useState(false);

  const opBnbTokens = useAppSelector((state) => state.opBnbTokens);
  const bnbTokens = useAppSelector((state) => state.bnbTokens);

  // const [confirmTransfer, setConfirmTransfer] = useState(true);
  const [confirmTransfer, setConfirmTransfer] =
    useState<TransferConfirmationState>(initialtransferConfirmationState);
  const [confirmSwap, setConfirmSwap] = useState<SwapConfirmationState>(
    initialSwapConfirmationState,
  );
  const [confirmBridge, setConfirmBridge] = useState<BridgeConfirmationState>(
    initialBridgeConfirmationState,
  );
  const [loading, setLoading] = useState(false);

  interface accounts {
    opBnbAccountService: OpBnbAccountService;
    bnbAccountService: BnbAccountService;
  }

  useEffect(() => {
    setDomLoaded(true);
    const services: accounts = getAccountService(
      address,
      pubKeyX,
      pubKeyY,
      keyId,
    );
    setAccountServices(services);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateOpBnbBalance = async () => {
    setLoading(true);
    const opBnbBalances =
      await accountServices?.opBnbAccountService.getBalances();
    await dispatch(fetchOpBnbTokens(opBnbBalances!));
    setLoading(false);
  };

  const updateBnbBalance = async () => {
    setLoading(true);
    const bnbBalances = await accountServices?.bnbAccountService.getBalances();
    await dispatch(fetchBnbTokens(bnbBalances!));
    setLoading(false);
  };
  const transfer = (args: any) => {
    const confirmationState: TransferConfirmationState = {
      open: true,
      to: args.to,
      amount: args.amount,
      assetName: args.asset_name,
    };
    setConfirmTransfer(confirmationState);
  };

  const from_swap = (args: any) => {
    const price = opBnbTokens.tokens[0].price;
    const fromAsset = args.from_asset;
    const toAsset = args.to_asset;
    const fromAmount = args.from_amount;
    const toAmount =
      fromAsset === "BNB"
        ? `${(parseFloat(fromAmount) * price * 0.9975).toFixed(6)}`
        : `${((parseFloat(fromAmount) / price) * 0.9975).toFixed(6)}`;
    const confirmationState: SwapConfirmationState = {
      fromAmount: fromAmount,
      fromAsset: fromAsset,
      open: true,
      toAmount: toAmount,
      toAsset: toAsset,
    };
    setConfirmSwap(confirmationState);
  };

  const to_swap = (args: any) => {
    const price = opBnbTokens.tokens[0].price;
    const fromAsset = args.from_asset;
    const toAsset = args.to_asset;
    const toAmount = args.to_amount;
    const fromAmount =
      fromAsset === "BNB"
        ? `${(parseFloat(toAmount) / 0.9975 / price).toFixed(6)}`
        : `${((parseFloat(toAmount) / 0.9975) * price).toFixed(6)}`;
    const confirmationState: SwapConfirmationState = {
      fromAmount: fromAmount,
      fromAsset: fromAsset,
      open: true,
      toAmount: toAmount,
      toAsset: toAsset,
    };
    setConfirmSwap(confirmationState);
  };

  const cross_chain_swap = (args: any) => {
    const fromChain = args.from_chain;
    const toChain = args.to_chain;
    const busdAmount = args.busd_amount;
    const confirmationState: BridgeConfirmationState = {
      open: true,
      fromChain: fromChain,
      toChain: toChain,
      busdAmount: busdAmount,
    };
    setConfirmBridge(confirmationState);
  };

  function runFunction(name: string, args: any) {
    const updatedArguments = args.replace(/\n/g, "");
    const argumentsObject = JSON.parse(updatedArguments);
    console.log(typeof argumentsObject);
    switch (name) {
      case "transfer":
        return transfer(argumentsObject);
      case "from_swap":
        return from_swap(argumentsObject);
      case "to_swap":
        return to_swap(argumentsObject);
      case "cross_chain_swap":
        return cross_chain_swap(argumentsObject);
      default:
        return null;
    }
  }

  const sendFunctionResponse = async (
    functionName: string,
    content: string,
  ) => {
    const original = messages;
    const removedLoadingMessage = original.slice(0, -1);
    const functionResponse: Message = {
      role: "function",
      name: functionName,
      content: content,
    };
    const updatedMessages = [...removedLoadingMessage, functionResponse];
    const response = await axios.post("/api/ai", { messages: updatedMessages });
    const assistantResponse = response.data.resp;
    const finalArr = [...updatedMessages, assistantResponse];
    setMessages(finalArr);
  };

  const handleTransferConfirmationCancle = async () => {
    setConfirmTransfer(initialtransferConfirmationState);
    await sendFunctionResponse(
      "transfer",
      "User decided to cancelled the transaction",
    );
  };

  const handleTransferConfirmationSubmit = async () => {
    setLoading(true);
    if (chain.chainName === "OPBNB") {
      if (confirmTransfer.assetName === "BNB") {
        if (
          parseFloat(confirmTransfer.amount) > opBnbTokens.tokens[0].balance
        ) {
          setConfirmTransfer(initialtransferConfirmationState);
          await sendFunctionResponse(
            "transfer",
            "Transaction failed because user does not have enough BNB tokens on OPBNB chain",
          );
          setLoading(false);
          return;
        }

        const txResponse = await accountServices?.opBnbAccountService.sendBNB(
          confirmTransfer.to,
          confirmTransfer.amount,
        );
        setConfirmTransfer(initialtransferConfirmationState);
        await sendFunctionResponse(
          "transfer",
          `The transfer of BNB was successful with a transaction hash ${txResponse.hash}`,
        );
        setLoading(false);
        await updateOpBnbBalance();
        return;
      } else if (confirmTransfer.assetName === "BUSD") {
        if (
          parseFloat(confirmTransfer.amount) > opBnbTokens.tokens[1].balance
        ) {
          setConfirmTransfer(initialtransferConfirmationState);
          await sendFunctionResponse(
            "transfer",
            "Transaction failed because user does not have enough BUSD tokens on OPBNB chain",
          );
          setLoading(false);
          return;
        }

        const txResponse = await accountServices?.opBnbAccountService.sendBUSD(
          confirmTransfer.to,
          confirmTransfer.amount,
        );
        setConfirmTransfer(initialtransferConfirmationState);
        await sendFunctionResponse(
          "transfer",
          `The transfer of BUSD was successful with a transaction hash ${txResponse.hash}`,
        );
        setLoading(false);
        await updateOpBnbBalance();
        return;
      } else {
        setConfirmTransfer(initialtransferConfirmationState);
        await sendFunctionResponse("transfer", "Token not supported");
        setLoading(false);
        return;
      }
    } else {
      if (confirmTransfer.assetName === "BNB") {
        if (parseFloat(confirmTransfer.amount) > bnbTokens.tokens[0].balance) {
          setConfirmTransfer(initialtransferConfirmationState);
          await sendFunctionResponse(
            "transfer",
            "Transaction failed because user does not have enough BNB tokens on BSC chain",
          );
          setLoading(false);
          return;
        }

        const txResponse = await accountServices?.bnbAccountService.sendBNB(
          confirmTransfer.to,
          confirmTransfer.amount,
        );
        setConfirmTransfer(initialtransferConfirmationState);
        await sendFunctionResponse(
          "transfer",
          `The transfer of BNB was successful with a transaction hash ${txResponse.hash}`,
        );
        setLoading(false);
        await updateBnbBalance();
        return;
      } else if (confirmTransfer.assetName === "BUSD") {
        if (parseFloat(confirmTransfer.amount) > bnbTokens.tokens[1].balance) {
          setConfirmTransfer(initialtransferConfirmationState);
          await sendFunctionResponse(
            "transfer",
            "Transaction failed because user does not have enough BUSD tokens on BSC chain",
          );
          setLoading(false);
          return;
        }

        const txResponse = await accountServices?.bnbAccountService.sendBUSD(
          confirmTransfer.to,
          confirmTransfer.amount,
        );
        setConfirmTransfer(initialtransferConfirmationState);
        await sendFunctionResponse(
          "transfer",
          `The transfer of BUSD was successful with a transaction hash ${txResponse.hash}`,
        );
        setLoading(false);
        await updateBnbBalance();
        return;
      } else {
        setConfirmTransfer(initialtransferConfirmationState);
        await sendFunctionResponse("transfer", "Token not supported");
        setLoading(false);
        return;
      }
    }
  };

  const handleSwapConfirmationSubmit = async () => {
    setLoading(true);
    if (chain.chainName === "OPBNB") {
      if (confirmSwap.fromAsset === "BNB") {
        if (
          parseFloat(confirmSwap.fromAmount) > opBnbTokens.tokens[0].balance
        ) {
          setConfirmSwap(initialSwapConfirmationState);
          await sendFunctionResponse(
            "swap",
            "Swap Transaction failed because user does not have enough BNB tokens on OPBNB chain",
          );
          setLoading(false);
          return;
        }

        const txResponse =
          await accountServices?.opBnbAccountService.swapBnBforBUSD(
            confirmSwap.fromAmount,
          );
        setConfirmSwap(initialSwapConfirmationState);
        await sendFunctionResponse(
          "swap",
          `The Swap of BNB to BUSD was successful with a transaction hash ${txResponse.hash}`,
        );
        setLoading(false);
        await updateOpBnbBalance();
        return;
      } else if (confirmSwap.fromAsset === "BUSD") {
        if (
          parseFloat(confirmSwap.fromAmount) > opBnbTokens.tokens[1].balance
        ) {
          setConfirmSwap(initialSwapConfirmationState);
          await sendFunctionResponse(
            "swap",
            "Swap Transaction failed because user does not have enough BUSD tokens on OPBNB chain",
          );
          setLoading(false);
          return;
        }

        const txResponse =
          await accountServices?.opBnbAccountService.swapBUSDforBNB(
            confirmSwap.fromAmount,
          );
        setConfirmSwap(initialSwapConfirmationState);
        await sendFunctionResponse(
          "swap",
          `The swap of BUSD to BNB was successful with a transaction hash ${txResponse.hash}`,
        );
        setLoading(false);
        await updateOpBnbBalance();
        return;
      } else {
        setConfirmSwap(initialSwapConfirmationState);
        await sendFunctionResponse("swap", "Token not supported");
        setLoading(false);
        return;
      }
    } else {
      if (confirmSwap.fromAsset === "BNB") {
        if (parseFloat(confirmSwap.fromAmount) > bnbTokens.tokens[0].balance) {
          setConfirmSwap(initialSwapConfirmationState);
          await sendFunctionResponse(
            "swap",
            "Swap Transaction failed because user does not have enough BNB tokens on OPBNB chain",
          );
          setLoading(false);
          return;
        }

        const txResponse =
          await accountServices?.bnbAccountService.swapBnBforBUSD(
            confirmSwap.fromAmount,
          );
        setConfirmSwap(initialSwapConfirmationState);
        await sendFunctionResponse(
          "swap",
          `The Swap of BNB to BUSD was successful with a transaction hash ${txResponse.hash}`,
        );
        setLoading(false);
        await updateBnbBalance();
        return;
      } else if (confirmSwap.fromAsset === "BUSD") {
        if (parseFloat(confirmSwap.fromAmount) > bnbTokens.tokens[1].balance) {
          setConfirmSwap(initialSwapConfirmationState);
          await sendFunctionResponse(
            "swap",
            "Swap Transaction failed because user does not have enough BUSD tokens on OPBNB chain",
          );
          setLoading(false);
          return;
        }

        const txResponse =
          await accountServices?.bnbAccountService.swapBUSDforBNB(
            confirmSwap.fromAmount,
          );
        setConfirmSwap(initialSwapConfirmationState);
        await sendFunctionResponse(
          "swap",
          `The swap of BUSD to BNB was successful with a transaction hash ${txResponse.hash}`,
        );
        setLoading(false);
        await updateBnbBalance();
        return;
      } else {
        setConfirmSwap(initialSwapConfirmationState);
        await sendFunctionResponse("swap", "Token not supported");
        setLoading(false);
        return;
      }
    }
  };

  const handleSwapConfirmationCancle = async () => {
    setConfirmSwap(initialSwapConfirmationState);
    await sendFunctionResponse(
      "swap",
      "User decided to cancelled the transaction",
    );
  };

  const handleBridgeConfirmationSubmit = async () => {
    setLoading(true);
    if (confirmBridge.fromChain === "OPBNB") {
      if (
        parseFloat(confirmBridge.busdAmount) > opBnbTokens.tokens[1].balance
      ) {
        setConfirmBridge(initialBridgeConfirmationState);
        await sendFunctionResponse(
          "bridge",
          "Swap Transaction failed because user does not have enough BUSD tokens on OPBNB chain",
        );
        setLoading(false);
        return;
      }
      await accountServices?.opBnbAccountService.bridgeFrom(
        confirmBridge.busdAmount,
      );
      setConfirmBridge(initialBridgeConfirmationState);
      setLoading(false);
      await sendFunctionResponse(
        "bridge",
        "Bridge successful from OPBNB to BSC",
      );
      return;
    } else if (confirmBridge.fromChain === "BSC") {
      if (parseFloat(confirmBridge.busdAmount) > bnbTokens.tokens[1].balance) {
        setConfirmBridge(initialBridgeConfirmationState);
        await sendFunctionResponse(
          "bridge",
          "Swap Transaction failed because user does not have enough BUSD tokens on OPBNB chain",
        );
        setLoading(false);
        return;
      }
      await accountServices?.bnbAccountService.bridgeFrom(
        confirmBridge.busdAmount,
      );
      setConfirmBridge(initialBridgeConfirmationState);
      setLoading(false);
      await sendFunctionResponse(
        "bridge",
        "Bridge successful from BSC to OPBNB",
      );
      return;
    } else {
      setConfirmBridge(initialBridgeConfirmationState);
      await sendFunctionResponse("bridge", "Bridging Chain not supported");
      setLoading(false);
      return;
    }
  };

  const handleBridgeConfirmationCancle = async () => {
    setConfirmBridge(initialBridgeConfirmationState);
    await sendFunctionResponse(
      "bridge",
      "User decided to cancelled the transaction",
    );
  };

  const messageHandler = async (role: string, message: string) => {
    const original = messages;

    const newMessage: Message = {
      role: role,
      content: message,
    };
    const newArr = [...original, newMessage, LoadingMessage];
    setMessages(newArr);

    const response = await axios.post("/api/ai", {
      messages: newArr.slice(0, -1),
    });
    const assistantResponse = response.data.resp;
    const finalArr = [...original, newMessage, assistantResponse];
    console.log(assistantResponse);
    if (assistantResponse.content === null) {
      console.log(assistantResponse.function_call.name);
      console.log(assistantResponse.function_call.arguments);
      runFunction(
        assistantResponse.function_call.name,
        assistantResponse.function_call.arguments,
      );
      return;
    }
    setMessages(finalArr);
  };

  return (
    <div
      className={`h-full mx-3 md:mx-0 ${
        tab === "chat" ? "bg-[#27292F]" : "bg-[#252831]"
      }  rounded-2xl`}
    >
      <div className="flex flex-col justify-center w-full">
        <TabItems tab={tab} setTab={setTab} />
      </div>
      <div className="md:h-full min-h-[75vh] md:min-h-0 pl-1 ">
        {tab === "chat" && (
          <ChatBot
            messages={messages}
            messageHandler={messageHandler}
            image={image}
          />
        )}
        {tab === "swap" && <Swap />}
        {tab === "bridge" && <Bridge />}
        {tab === "history" && <History />}
      </div>
      {domLoaded && (
        <ConfirmTransfer
          loading={loading}
          chain={chain.chainName}
          handleTransferConfirmationCancle={handleTransferConfirmationCancle}
          handleTransferConfirmationSubmit={handleTransferConfirmationSubmit}
          onOpen={confirmTransfer.open}
          amount={confirmTransfer.amount}
          assetName={confirmTransfer.assetName}
          to={confirmTransfer.to}
        />
      )}
      {domLoaded && (
        <ConfirmSwap
          loading={loading}
          chain={chain.chainName}
          handleSwapConfirmationCancle={handleSwapConfirmationCancle}
          handleSwapConfirmationSubmit={handleSwapConfirmationSubmit}
          onOpen={confirmSwap.open}
          fromAsset={confirmSwap.fromAsset}
          fromAmount={confirmSwap.fromAmount}
          toAsset={confirmSwap.toAsset}
          toAmount={confirmSwap.toAmount}
        />
      )}
      {domLoaded && (
        <ConfirmBridge
          onOpen={confirmBridge.open}
          loading={loading}
          fromChain={confirmBridge.fromChain}
          toChain={confirmBridge.toChain}
          busdAmount={confirmBridge.busdAmount}
          handleBridgeConfirmationSubmit={handleBridgeConfirmationSubmit}
          handleBridgeConfirmationCancle={handleBridgeConfirmationCancle}
        />
      )}
    </div>
  );
};

export default Tabs;
