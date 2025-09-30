"use client";

import { Chatbot } from "@/types/types";
import { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar } from "@/components/Avatar";
import Link from "next/link";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en";

TimeAgo.addLocale(en);

interface ChatbotSessionsProps {
  chatbots: Chatbot[];
}

const ChatbotSessions: FC<ChatbotSessionsProps> = ({ chatbots }) => {
  if (!chatbots) return null;

  if (chatbots.length === 0) {
    return (
      <p className="p-4 bg-muted my-4 font-medium">No chat sessions found.</p>
    );
  }

  return (
    <Accordion type="single" collapsible>
      {chatbots.map((chatbot) => {
        const hasSession = chatbot.chat_sessions.length > 0;

        return (
          <AccordionItem
            value={`item-${chatbot.id}`}
            key={chatbot.id}
            className="py-5"
          >
            {hasSession ? (
              <>
                <AccordionTrigger className="cursor-pointer outline-none bg-muted items-center px-4">
                  <div className="flex text-left items-center w-full gap-4">
                    <Avatar seed={chatbot.name} className="size-10" />

                    <div className="flex flex-1 justify-between gap-4">
                      <p className="text-lg font-bold">{chatbot.name}</p>

                      <p className="font-bold">
                        {chatbot.chat_sessions.length} sessions
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="flex flex-col gap-4 pt-4">
                  {chatbot.chat_sessions
                    .sort(
                      (a, b) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                    )
                    .map((session) => {
                      return (
                        <Link
                          key={session.id}
                          href={`/review-sessions/${session.id}`}
                          className="py-7 p-7 flex flex-col rounded-lg relative border hover:bg-muted"
                        >
                          <p className="text-base font-bold">
                            {session.guests?.name || "Anonymous"}
                          </p>

                          <p className="text-sm font-light">
                            {session.guests?.email || "No email provided"}
                          </p>

                          <div className="absolute right-3 top-2 text-sm">
                            <ReactTimeAgo
                              date={new Date(session.created_at)}
                              locale="en-US"
                            />
                          </div>
                        </Link>
                      );
                    })}
                </AccordionContent>
              </>
            ) : (
              <div className="p-4 bg-muted rounded-md flex items-center gap-4">
                <Avatar seed={chatbot.name} className="size-10" />

                <p className="text-base font-bold flex-1 pr-5">
                  {chatbot.name}
                </p>

                <strong className="ml-auto">(No sessions)</strong>
              </div>
            )}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default ChatbotSessions;
