import { Bot, BotMessageSquare, Palette } from "lucide-react";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import ClientLink from "./ClientLink";

const menu = [
  {
    id: uuidv4(),
    label: "Create Chatbot",
    href: "/create-chatbot",
    icon: <BotMessageSquare className="size-6 lg:size-8" />,
  },
  {
    id: uuidv4(),
    label: "View Chatbots",
    href: "/view-chatbots",
    icon: <BotMessageSquare className="size-6 lg:size-8" />,
  },
  {
    id: uuidv4(),
    label: "Review sessions",
    href: "/review-sessions",
    icon: <Bot className="size-6 lg:size-8" />,
  },
  {
    id: uuidv4(),
    label: "Colors",
    href: "/ds",
    icon: <Palette className="size-6 lg:size-8" />,
  },
];

const Sidebar = () => {
  return (
    <div className="p-4 bg-sidebar">
      <ul className="gap-5 flex flex-row flex-wrap lg:flex-col">
        {menu.map((item) => {
          return (
            <li className="flex-1" key={item.id}>
              <ClientLink href={item.href}>
                {item.icon}
                {item.label}
              </ClientLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
