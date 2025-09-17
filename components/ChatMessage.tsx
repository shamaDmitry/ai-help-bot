import { cn } from "@/lib/utils";
import { Guest, Message } from "@/types/types";
import React, { FC } from "react";
import Avatar from "./Avatar";
import { User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
    <div
      key={message.id}
      className={cn("chat", {
        "chat-start": !isUser,
        "chat-end": isUser,
      })}
    >
      <div className="chat-image avatar">
        <div
          className={cn("w-10 rounded-full !flex items-center justify-center", {
            "border border-gray-300": isUser,
          })}
        >
          {isAI && <Avatar seed={chatbotName} className="size-5" />}

          {isUser && <User />}
        </div>
      </div>

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

      <div className="chat-bubble">
        <ReactMarkdown className="break-words" remarkPlugins={[remarkGfm]}>
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage;
