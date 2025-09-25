import { cn } from "@/lib/utils";
import { Guest, Message } from "@/types/types";
import React, { FC } from "react";
import { Avatar as CustomAvatar } from "./Avatar";

import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: Message;
  chatbotName: string;
  guest: { name: string; email: string };
}

const ChatMessage: FC<ChatMessageProps> = ({ message, chatbotName, guest }) => {
  const isUser = message.sender === "user";
  const isAI = message.sender === "ai";

  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = formatter.format(new Date(message.created_at));

  return (
    <>
      {/* <div
        key={message.id}
        className={cn("flex", {
          "justify-start": !isUser,
          "justify-end": isUser,
        })}
      >
        <div
          className={cn("", {
            "order-first": !isUser,
            "order-last": isUser,
          })}
        >
          <div
            className={cn(
              "size-10 rounded-full !flex items-center justify-center",
              {
                "border border-gray-300": isUser,
              }
            )}
          >
            {isAI && <CustomAvatar seed={chatbotName} className="size-5" />}

            {isUser && <User />}
          </div>
        </div>

        <div className="flex flex-col">
          <div className="chat-header">
            {isAI && <div>{chatbotName}</div>}

            {isUser && (
              <div className="flex gap-2">
                <span className="text-gray-500">{guest.email}</span>
                <span className="font-semibold">{guest.name}</span>
              </div>
            )}
            <time className="text-xs opacity-50">{formattedDate}</time>
          </div>

          <div className="max-w-11/12 minw">
            <ReactMarkdown className="break-words" remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div> */}

      <div
        key={message.id}
        className={`flex gap-3 ${
          message.sender === "user" ? "justify-end" : "justify-start"
        }`}
      >
        {message.sender === "ai" && (
          <Avatar className="w-8 h-8 mt-1">
            <AvatarImage src="/ai-assistant-avatar.png" />
            <AvatarFallback className="bg-blue-600 text-white">
              <Bot className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
        )}

        <div
          className={`max-w-xs lg:max-w-md ${
            message.sender === "user" ? "order-1" : ""
          }`}
        >
          <div className="text-xs text-gray-500 mb-1">{formattedDate}</div>
         
          <div
            className={`p-3 rounded-2xl text-sm ${
              message.sender === "user"
                ? "bg-primary text-primary-foreground ml-auto text-right"
                : "bg-muted text-gray-900 border border-gray-200"
            }`}
          >
            <ReactMarkdown className="break-words" remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        </div>

        {message.sender === "user" && (
          <Avatar className="w-8 h-8 mt-1 order-2">
            <AvatarImage src="/diverse-user-avatars.png" />
            <AvatarFallback className="bg-gray-600 text-white">
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </>
  );
};

export default ChatMessage;
