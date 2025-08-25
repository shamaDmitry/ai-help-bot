"use client";

import Avatar from "@/components/Avatar";
import Characteristic from "@/components/Characteristic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/graphql/apolloClient";
import { GET_CHATBOT_BY_ID } from "@/graphql/queries/queries";
import { GetChatbotByIdResponse, GetChatbotByIdVariables } from "@/types/types";
import { useQuery } from "@apollo/client/react";
import { Copy, X } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

const EditChatBot = ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = use(params);
  const [url, setUrl] = useState("");
  const [chatbotName, setChatbotName] = useState("");
  const [newCharacteristic, setNewCharacteristic] = useState("");

  const { data, loading, error } = useQuery<
    GetChatbotByIdResponse,
    GetChatbotByIdVariables
  >(GET_CHATBOT_BY_ID, {
    variables: { id },
  });

  useEffect(() => {
    if (data) {
      setChatbotName(data.chatbots?.name || "");
    }
  }, [data]);

  useEffect(() => {
    const url = `${BASE_URL}/chatbot/${id}`;

    setUrl(url);
  }, [id]);

  const handleUpdateChatbot = () => {};

  return (
    <section className="w-full">
      <div className="md:sticky md:top-0 z-50 sm:max-w-sm ml-auto space-y-2 md:border p-5 rounded-b-lg md:rounded-lg bg-blue-500 w-full">
        <h1 className="text-white text-sm font-bold">Link to Chat</h1>

        <p className="text-sm italic text-white">Share link</p>

        <div className="flex gap-3">
          <Link href={url} className="w-full cursor-pointer hover:opacity-50">
            <Input value={url} readOnly className="cursor-pointer bg-white" />
          </Link>

          <Button
            onClick={() => {
              navigator.clipboard.writeText(url);

              toast.success("Copied to clipboard");
            }}
          >
            <span className="sr-only">Copy</span>
            <Copy className="size-4" />
          </Button>
        </div>
      </div>

      <div className="relative mt-5 bg-white p-5 md:p-10 rounded-lg">
        <Button
          variant="destructive"
          className="absolute top-1 right-1 md:right-4 md:top-4"
        >
          <X className="size-4" />
        </Button>

        <div className="flex gap-4">
          <Avatar seed={chatbotName} />

          <form
            onSubmit={handleUpdateChatbot}
            className="flex flex-1 gap-3 items-center"
          >
            <Input
              value={chatbotName}
              onChange={(e) => setChatbotName(e.target.value)}
            />

            <Button type="submit">Update</Button>
          </form>
        </div>

        <h2 className="text-xl font-bold mt-10 mb-3">
          Heres what your AI knows...
        </h2>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
          excepturi vitae repellat atque facere. Quod omnis nisi libero
          recusandae dolorem facere, amet repellendus natus sunt optio ad
          consectetur eligendi deserunt!
        </p>

        <div className="mt-5">
          <form className="flex gap-3">
            <Input
              type="text"
              placeholder="Example: If customer asks for prices, provide pricing page: example.com/pricing"
              value={newCharacteristic}
              onChange={(e) => setNewCharacteristic(e.target.value)}
            />

            <Button type="submit" disabled={!newCharacteristic}>
              Add
            </Button>
          </form>

          <ul>
            {data?.chatbots.chatbot_characteristics.map((item) => {
              return (
                <li key={item.id}>
                  <Characteristic characteristic={item} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default EditChatBot;
