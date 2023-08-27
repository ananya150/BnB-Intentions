"use client";
import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import TextareaAutosize from "react-textarea-autosize";

interface Message {
  text: string;
  isBot: boolean;
}

const ChatInput = ({ messageHandler }: { messageHandler: any }) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const sendMessage = async () => {
    const message: Message = {
      text: input,
      isBot: false,
    };
    messageHandler(message);
    const botReply: Message = {
      text: "Alright I see that",
      isBot: true,
    };
    messageHandler(botReply);
    setInput("");
  };

  return (
    <div className="pl-10 pr-3 py-6 mb-2 sm:mb-0 flex items-center">
      <div className="flex-1 overflow-hidden rounded-xl shadow-sm ring-1 ring-inset ring-[#3d3e44] focus-within:ring-2">
        <TextareaAutosize
          ref={textareaRef}
          onKeyDown={(e: any) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          rows={1}
          value={input}
          onChange={(e: any) => setInput(e.target.value)}
          placeholder={`Express your task`}
          className="block w-full rounded-xl resize-none border-0 bg-[#3d3e44] text-white placeholder:text-gray-400 focus-within:ring-0 py-4 px-8 leading-6"
        />

        {/* <div
          onClick={() => textareaRef.current?.focus()}
          className='py-2 focus:ring-0'
          aria-hidden='true'>
          <div className='py-px'>
            <div className='h-9' />
          </div>
        </div> */}
      </div>
      <div className=" right-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
        <div className="">
          <Button onClick={sendMessage} type="submit">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
