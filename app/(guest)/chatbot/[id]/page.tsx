"use client";

import { useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormEvent, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Avatar from "@/components/Avatar";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@apollo/client/react";
import {
  GET_CHATBOT_BY_ID,
  GET_MESSAGES_BY_CHAT_SESSION_ID,
} from "@/graphql/queries/queries";
import {
  GetChatbotByIdResponse,
  Message,
  MessagesByChatSessionIdResponse,
  MessagesByChatSessionIdVariables,
} from "@/types/types";
import { startNewChat } from "@/lib/startNewChat";

function ChatbotPage() {
  const params = useParams();
  const { id } = params;

  const [userName, setName] = useState("ded");
  const [email, setEmail] = useState("ded@ded.com");
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);

  const {
    loading: loadingQuery,
    error,
    data,
  } = useQuery<
    MessagesByChatSessionIdResponse,
    MessagesByChatSessionIdVariables
  >(GET_MESSAGES_BY_CHAT_SESSION_ID, {
    variables: { chat_session_id: Number(chatId) },
    skip: !chatId,
  });

  useEffect(() => {
    if (data) {
      setMessages(data.chat_sessions?.messages);
    }
  }, [data]);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const chatId = await startNewChat(userName, email, Number(id));

    console.log("chatId", chatId);

    setChatId(chatId || 0);
    setIsOpen(false);
  };

  const { data: chatBotData } = useQuery<GetChatbotByIdResponse>(
    GET_CHATBOT_BY_ID,
    {
      variables: { id: Number(id) },
    }
  );

  return (
    <div className="w-full max-w-xl mx-auto h-screen p-10">
      <Card className="min-h-full">
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center justify-center w-full gap-4">
            <Avatar seed={chatBotData?.chatbots?.name} className="size-8" />

            <p className="text-sm font-medium leading-none">
              {chatBotData?.chatbots?.name}
            </p>
          </div>
        </CardHeader>

        <CardContent className="flex-1">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.sender === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
            ))}
          </div>
        </CardContent>

        <CardFooter>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              // if (inputLength === 0) return;
              // setMessages([
              //   ...messages,
              //   {
              //     role: "user",
              //     content: input,
              //   },
              // ]);
              // setInput("");
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              id="message"
              placeholder="Type your message..."
              className="flex-1"
              autoComplete="off"
              // value={input}
              // onChange={(event) => setInput(event.target.value)}
            />
            <Button
              type="submit"
              size="icon"
              // disabled={inputLength === 0}
            >
              <Send />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <form onSubmit={handleFormSubmit}>
            <DialogHeader className="mb-5 ">
              <DialogTitle className="text-center">
                Lets help you out!
              </DialogTitle>

              <DialogDescription className="text-center">
                I just need a few details to get started.
              </DialogDescription>
            </DialogHeader>

            <div className="mb-10 flex flex-col gap-4">
              <div className="grid w-full items-center gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Name"
                  value={userName}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="grid w-full items-center gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter className="sm:justify-start">
              <Button
                type="submit"
                disabled={!userName || !email || loading}
                className="w-full sm:w-auto"
              >
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ChatbotPage;
