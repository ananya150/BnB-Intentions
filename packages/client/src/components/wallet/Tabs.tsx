"use client";
import React, { useState } from "react";
import TabItems from "./TabsItems";
import ChatBot from "./Chat";
import Swap from "./Swap";
import Bridge from "./Bridge";
import History from "./History";

interface Message {
  text: string;
  isBot: boolean;
}

const initialMessage: Message[] = [
  {
    text: "Hello from the bot!",
    isBot: true,
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

  const messageHandler = (message: Message) => {
    setMessages((prev) => [message, ...prev]);
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
        {/* {tab === "chat" && (
          <ChatBot
            messages={messages}
            messageHandler={messageHandler}
            image={image}
          />
        )} */}
        {tab === "swap" && <Swap />}
        {tab === "bridge" && <Bridge />}
        {tab === "history" && <History />}
      </div>
    </div>
  );
};

export default Tabs;
