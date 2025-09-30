"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar } from "./Avatar";
import { Guest, Message } from "@/types/types";
import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

interface MessagesProps {
  messages: Message[];
  chatbotName: string;
  guest: Guest;
}

export function Messages({ messages, chatbotName, guest }: MessagesProps) {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-center border-b">
          <div className="flex items-center gap-4">
            <div className="p-1 bg-background dark:bg-accent rounded-full shadow-md">
              <Avatar className="size-8" seed={chatbotName} />
            </div>

            <p className="text-sm font-medium leading-none">{chatbotName}</p>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {messages.map((message) => {
              return (
                <ChatMessage
                  guest={{ name: guest.name, email: guest.email }}
                  key={message.id}
                  message={message}
                  chatbotName={chatbotName}
                />
              );
            })}
          </div>

          <div ref={messageRef} />
        </CardContent>
      </Card>
    </>
  );
}
