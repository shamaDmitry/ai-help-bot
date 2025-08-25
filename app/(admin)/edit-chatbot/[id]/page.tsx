"use client";

import Avatar from "@/components/Avatar";
import Characteristic from "@/components/Characteristic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/graphql/apolloClient";
import { DELETE_CHATBOT } from "@/graphql/mutations/mutations";
import { GET_CHATBOT_BY_ID } from "@/graphql/queries/queries";
import {
  ChatbotCharacteristic,
  GetChatbotByIdResponse,
  GetChatbotByIdVariables,
} from "@/types/types";
import { useMutation, useQuery } from "@apollo/client/react";
import { Copy, LoaderPinwheel, X } from "lucide-react";
import Link from "next/link";
import { SyntheticEvent, use, useEffect, useState } from "react";
import { toast } from "sonner";

const EditChatBot = ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = use(params);
  const [url, setUrl] = useState("");
  const [chatbotName, setChatbotName] = useState("");
  const [newCharacteristic, setNewCharacteristic] = useState("");

  const [deleteChatbot] = useMutation(DELETE_CHATBOT, {
    refetchQueries: ["GetChatbotById"],
    awaitRefetchQueries: true,
  });

  const { data, loading } = useQuery<
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

  const handleUpdateChatbot = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  // const promise = handleDelete(characteristic);

  // toast.promise(promise, {
  //   loading: "Removing characteristic...",
  //   success: "Characteristic removed",
  //   error: "Error removing characteristic",
  // });

  const handleDelete = async (id: number) => {
    try {
      const promise = deleteChatbot({
        variables: { id: id },
      });

      toast.promise(promise, {
        loading: "Deleting chatbot...",
        success: "Chatbot deleted",
        error: "Failed to delete chatbot",
      });
    } catch (error) {
      console.error("error", error);
      toast.error("Failed to delete chatbot");
    }
  };

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
          onClick={() => {
            handleDelete(id);
          }}
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

        <p>Your chatbot knows the following instructions.</p>

        <div className="mt-5">
          <form className="flex gap-3 mb-4">
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

          <div className="flex flex-wrap gap-4">
            {loading && (
              <div className="flex items-center justify-center w-full py-4">
                <LoaderPinwheel className="animate-spin text-primary size-8" />
              </div>
            )}

            {!loading &&
              data?.chatbots.chatbot_characteristics.map(
                (item: ChatbotCharacteristic) => {
                  return <Characteristic key={item.id} characteristic={item} />;
                }
              )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditChatBot;
