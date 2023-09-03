"use client";
import React, { useState } from "react";
import TabItems from "./TabsItems";
import ChatBot from "./Chat";
import Swap from "./Swap";
import Bridge from "./Bridge";
import History from "./History";
import axios from "axios";

interface Message {
  role: string;
  content: string;
}

const initialMessage: Message[] = [
  {
    role: "system",
    content: `
      Your are an AI assistant for a crypto wallet named OpIntents. 
      The wallet supports only 2 assets BNB and BUSD on two different chains BSC and its optimistic rollup named OPBNB.
      You are going to help user for the following tasks :- 
      a) transfer assets to an address 
      b) swaps between the assets on same chain 
      c) BUSD swaps between different chains
      using function caling. Don't make assumptions about what values to plug into functions, If enough innformation is not provided, ask the user for the information needed.
      If user mentions any other assets other than BNB and BUSD and any chains other than BSC and OPBNB, tell him its not supported. 
     `,
  },
];

interface props {
  address: string;
  pubKeyX: string;
  pubKeyY: string;
  keyId: string;
  image: string;
}

const Tabs = ({ address, pubKeyX, pubKeyY, keyId, image }: props) => {
  const [tab, setTab] = useState<string>("chat");
  const [messages, setMessages] = useState<Message[]>(initialMessage);

  const messageHandler = async (role: string, message: string) => {
    const newMessage: Message = {
      role: role,
      content: message,
    };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    const response = await axios.post("/api/ai", { messages: updatedMessages });
    console.log(response.data.resp);
    setMessages((prev) => [...prev, response.data.resp]);
  };

  const handleTabChange = (newTab: string) => {
    setTab(newTab);
  };

  return (
    <div
      className={`h-full ${
        tab === "chat" ? "bg-[#27292F]" : "bg-[#252831]"
      }  rounded-2xl`}
    >
      <div className="flex flex-col justify-center w-full">
        <TabItems tab={tab} setTab={setTab} />
      </div>
      <div className="h-full pl-1">
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
    </div>
  );
};

export default Tabs;
