import { Message } from "@/types/types";
import React, { FC } from "react";

import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: Message;
  chatbotName?: string;
  guest?: { name: string; email: string };
}

const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
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
      className={`flex gap-3 ${
        message.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      {message.sender === "ai" && (
        <Avatar className="w-8 h-8 mt-1">
          <AvatarImage src="" />

          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={`max-w-xs lg:max-w-md ${
          message.sender === "user" ? "order-1 text-right" : ""
        }`}
      >
        <div className="text-xs text-gray-500 mb-1">{formattedDate}</div>

        <div
          className={`p-3 rounded-2xl text-sm inline-flex ${
            message.sender === "user"
              ? "bg-primary text-primary-foreground ml-auto"
              : "bg-muted border"
          }`}
        >
          <ReactMarkdown className="break-words" remarkPlugins={[remarkGfm]}>
            {message.content}
          </ReactMarkdown>
        </div>
      </div>

      {message.sender === "user" && (
        <Avatar className="w-8 h-8 mt-1 order-2">
          <AvatarImage src="" />

          <AvatarFallback className="bg-secondary text-secondary-foreground">
            <User className="w-4 h-4" />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
