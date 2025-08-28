import { BotMessageSquare } from "lucide-react";
import Link from "next/link";
import React from "react";
import { v4 as uuidv4 } from "uuid";

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
    label: "Review Chatbot",
    href: "/review-chatbot",
    icon: <BotMessageSquare className="size-6 lg:size-8" />,
  },
];

const Sidebar = () => {
  return (
    <div className="text-white p-5">
      <ul className="gap-5 flex flex-row lg:flex-col">
        {menu.map((item) => {
          return (
            <li className="flex-1" key={item.id}>
              <Link
                href={item.href}
                className="hover:opacity-50 flex flex-col text-center lg:text-left lg:flex-row items-center gap-2 p-5 rounded-md bg-blue-500 flex-1 h-full justify-center"
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
