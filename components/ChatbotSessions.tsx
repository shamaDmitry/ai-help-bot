"use client";

import { Chatbot } from "@/types/types";
import { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Avatar from "@/components/Avatar";
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
                <AccordionTrigger className="cursor-pointer outline-none">
                  <div className="flex text-left items-center w-full gap-4">
                    <Avatar seed={chatbot.name} className="size-10" />

                    <div className="flex flex-1 justify-between gap-4">
                      <p>{chatbot.name}</p>
                      <p className="font-bold">
                        {chatbot.chat_sessions.length} sessions
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="flex flex-col gap-4">
                  {chatbot.chat_sessions.map((session) => {
                    return (
                      <Link
                        key={session.id}
                        href={`/review-sessions/${session.id}`}
                        className="py-7 p-7 bg-secondary flex flex-col rounded-lg relative"
                      >
                        <p className="text-lg font-bold">
                          {session.guests.name || "Anonymous"}
                        </p>

                        <p className="text-sm font-light">
                          {session.guests.email || "No email provided"}
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
              <p className="text-sm">{chatbot.name} (No sessions)</p>
            )}
          </AccordionItem>
        );
      })}

      {/* <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem> */}
    </Accordion>
  );
};

export default ChatbotSessions;
