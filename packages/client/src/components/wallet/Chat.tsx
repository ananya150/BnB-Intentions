"use client";
import React from "react";
import ChatInput from "./ChatInput";
import { useState, useRef, useEffect } from "react";
import Messages from "./Messages";

const ChatBot = ({
  image,
  messages,
  messageHandler,
}: {
  image: string;
  messages: any;
  messageHandler: any;
}) => {
  return (
    <div className="flex-1 justify-end flex flex-col h-full w-full">
      <div className="flex flex-col justify-end">
        <Messages messages={messages} image={image} />
      </div>
      <div className="h-1/6">
        <ChatInput messageHandler={messageHandler} />
      </div>
    </div>
  );
};

export default ChatBot;
