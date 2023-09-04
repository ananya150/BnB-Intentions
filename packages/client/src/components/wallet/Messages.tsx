"use client";
import React from "react";
import Image from "next/image";
import { cn } from "../../lib/utils";
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: string;
  content: string;
}

interface props {
  messages: Message[];
  image: string;
}

const initialMessage = `
I can help you with a variety of tasks. Here are some examples:\n' +
'\n' +
'1. Provide information: I can answer questions, provide definitions, and give explanations on various topics.\n' +
'\n' +
'2. Perform calculations: I can help with basic and complex calculations, including arithmetic, algebra, geometry, and more.\n' +
'\n' +
'3. Language assistance: I can assist with grammar, spelling, and provide suggestions for improving your writing.\n' +
`;

const Messages = ({ messages, image }: props) => {
  const scrollDownRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<any>(null);
  console.log(messages);

  const scrollToBottom = () => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div
      id="messages"
      ref={chatContainerRef}
      className={`flex max-h-[59vh] flex-1 space-y-6 flex-col gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch `}
    >
      <div ref={scrollDownRef} />

      {messages.length === 0 && (
        <div className={`chat-message`}>
          <div className={cn("flex items-end")}>
            <div
              className={cn(
                "flex flex-col space-y-2 text-base max-w-3xl mx-2",
                "order-2 items-start",
              )}
            >
              <div
                className={cn(
                  "px-4 py-2 rounded-lg inline-block break-words prose-p:leading-relaxed ",
                  "bg-gray-200 text-gray-900",
                )}
              >
                <p>
                  Hello, I am an AI bot for your Opintents crypto wallet. The
                  wallet currently supports two chain OPBNB & BSC and two assets
                  BNB & BUSD. I can help answer your crypto questions and help
                  with following tasks.
                </p>
                <p>1. Transfer BUSD and BNB to any address.</p>
                <p>2. Swap between BNB and BUSD on any chain.</p>
                <p>3. Bridge BUSD instantly between OPBNB and BSC</p>
              </div>
            </div>

            <div
              className={cn(
                `relative w-[50px] h-6 flexjustify-start`,
                "order-1",
              )}
            >
              <Image
                src={"/bot.png"}
                height={100}
                width={100}
                alt="Profile picture"
                referrerPolicy="no-referrer"
                className="rounded-full w-[40px] h-[40px]"
              />
            </div>
          </div>
        </div>
      )}

      {messages.map((message, index) => {
        if (message.role === "user" || message.role === "assistant") {
          if (message.content === null) {
            return null;
          }

          const isUser = message.role === "user";
          const hasNextMessageFromSameUser =
            messages[index - 1]?.role === messages[index].role;

          return (
            <div className={`chat-message`} key={index}>
              <div className={cn("flex items-end", { "justify-end": isUser })}>
                <div
                  className={cn(
                    "flex flex-col space-y-2 text-base max-w-3xl mx-2",
                    {
                      "order-1 items-end": isUser,
                      "order-2 items-start": !isUser,
                    },
                  )}
                >
                  <ReactMarkdown
                    className={cn(
                      "px-4 py-2 rounded-lg inline-block break-words prose-p:leading-relaxed ",
                      {
                        "bg-indigo-600 text-white": isUser,
                        "bg-gray-200 text-gray-900": !isUser,
                        "rounded-br-none":
                          !hasNextMessageFromSameUser && isUser,
                        "rounded-bl-none":
                          !hasNextMessageFromSameUser && !isUser,
                      },
                    )}
                  >
                    {message.content}
                  </ReactMarkdown>
                </div>

                <div
                  className={cn(
                    `relative w-[50px] h-6 flex ${
                      isUser ? "justify-end" : "justify-start"
                    }`,
                    {
                      "order-2": isUser,
                      "order-1": !isUser,
                      invisible: hasNextMessageFromSameUser,
                    },
                  )}
                >
                  <Image
                    src={isUser ? (image as string) : "/bot.png"}
                    height={100}
                    width={100}
                    alt="Profile picture"
                    referrerPolicy="no-referrer"
                    className="rounded-full w-[40px] h-[40px]"
                  />
                </div>
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default Messages;
