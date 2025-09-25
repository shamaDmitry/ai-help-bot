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
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar } from "@/components/Avatar";
import { Send } from "lucide-react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import ChatMessage from "@/components/ChatMessage";

const formSchema = z.object({
  message: z.string().min(2, "Message is required"),
});

function ChatbotPage() {
  const params = useParams();
  const { id } = params;

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatId, setChatId] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  const { data } = useQuery<
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

  const handleInfoFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const chatId = await startNewChat(userName, email, Number(id));

    setChatId(chatId || 0);
    setIsOpen(false);
  };

  const { data: chatBotData } = useQuery<GetChatbotByIdResponse>(
    GET_CHATBOT_BY_ID,
    {
      variables: { id: Number(id) },
    }
  );

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);

    const { message } = data;

    form.reset();

    if (!userName || !email) {
      setIsOpen(true);
      setLoading(false);
      return;
    }

    if (!message.trim()) {
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      content: message,
      created_at: new Date().toISOString(),
      chat_session_id: chatId,
      sender: "user",
    };

    const loadingMessage: Message = {
      id: Date.now() + 1,
      content: "Thinking...",
      created_at: new Date().toISOString(),
      chat_session_id: chatId,
      sender: "ai",
    };

    setMessages((prev) => [...prev, userMessage, loadingMessage]);

    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          chat_session_id: chatId,
          chatbot_id: Number(id),
          content: message,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      const result = await response.json();

      setMessages((prevMessages) => {
        return prevMessages.map((msg) => {
          return msg.id === loadingMessage.id
            ? {
                ...msg,
                content: result.content,
                id: result.id,
              }
            : msg;
        });
      });
    } catch (error) {
      toast.error(`Error sending message: ${JSON.stringify(error)}`);
      console.log("messages", messages);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-screen p-10">
      <Card className="min-h-full h-full overflow-y-auto relative gap-0 py-0 border-accent">
        <CardHeader className="z-50 bg-accent p-4 flex flex-row items-center sticky top-0 left-0">
          <div className="flex items-center justify-center w-full gap-4">
            <Avatar seed={chatBotData?.chatbots?.name} className="size-8" />

            <p className="text-sm font-medium leading-none">
              {chatBotData?.chatbots?.name}
            </p>
          </div>
        </CardHeader>

        <CardContent className="flex-1 py-4">
          <div className="space-y-4">
            {messages.map((message) => {
              return (
                <ChatMessage
                  guest={{ name: userName, email: email }}
                  key={message.id}
                  message={message}
                  chatbotName={chatBotData?.chatbots?.name || "AI"}
                />
              );
            })}
          </div>

          <div ref={messageRef} />
        </CardContent>

        <CardFooter className="sticky bottom-0 left-0 bg-accent p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex gap-4 w-full"
            >
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel hidden>message</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Type your message..."
                        {...field}
                        className="w-full"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                size="icon"
                disabled={
                  form.formState.isSubmitting || !form.formState.isValid
                }
              >
                <Send />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </Form>
        </CardFooter>
      </Card>

      <Dialog open={isOpen} onOpenChange={() => setIsOpen(true)}>
        <DialogContent>
          <form onSubmit={handleInfoFormSubmit}>
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
                  onChange={(e) => setUserName(e.target.value)}
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
                {loading ? "Loading..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ChatbotPage;
