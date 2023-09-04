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

const Messages = ({ messages, image }: props) => {
  const scrollDownRef = useRef<HTMLDivElement | null>(null);
  console.log(messages);

  return (
    <div
      id="messages"
      className={`flex max-h-[59vh] flex-1 space-y-6 flex-col gap-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch `}
    >
      <div ref={scrollDownRef} />

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
