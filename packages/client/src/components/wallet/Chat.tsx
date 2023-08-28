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
      <div className="">
        {/* <div className='relative flex items-center space-x-4'>
          <div className='relative'>
            <div className='relative w-8 sm:w-12 h-8 sm:h-12'>
              <Image
                fill
                referrerPolicy='no-referrer'
                src={chatPartner.image}
                alt={`${chatPartner.name} profile picture`}
                className='rounded-full'
              />
            </div>
          </div>

          <div className='flex flex-col leading-tight'>
            <div className='text-xl flex items-center'>
              <span className='text-gray-700 mr-3 font-semibold'>
                {chatPartner.name}
              </span>
            </div>

            <span className='text-sm text-gray-600'>{chatPartner.email}</span>
          </div>
        </div> */}
      </div>
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
