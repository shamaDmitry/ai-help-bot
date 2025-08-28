"use client";

import Avatar from "@/components/Avatar";
import Characteristic from "@/components/Characteristic";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/ui/loading-button";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/graphql/apolloClient";
import { DELETE_CHATBOT, UPDATE_CHATBOT } from "@/graphql/mutations/mutations";
import { GET_CHATBOT_BY_ID } from "@/graphql/queries/queries";
import {
  ChatbotCharacteristic,
  GetChatbotByIdResponse,
  GetChatbotByIdVariables,
} from "@/types/types";
import { useMutation, useQuery } from "@apollo/client/react";
import { Copy, X } from "lucide-react";
import Link from "next/link";
import { SyntheticEvent, use, useEffect, useState } from "react";
import { toast } from "sonner";
import AddCharacteristicForm from "@/components/ui/edit-chatbot/add-characteristic-form";
import LoadingOverlay from "@/components/ui/loading-overlay";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { redirect } from "next/navigation";

const EditChatBot = ({ params }: { params: Promise<{ id: number }> }) => {
  const { id } = use(params);
  const [url, setUrl] = useState("");
  const [chatbotName, setChatbotName] = useState("");

  const [deleteChatbot, { loading: isDeleting }] = useMutation(DELETE_CHATBOT, {
    refetchQueries: ["GetChatbotById"],
    awaitRefetchQueries: true,
  });

  const [updateChatbot, { loading: isUpdating }] = useMutation(UPDATE_CHATBOT, {
    refetchQueries: ["GetChatbotById"],
  });

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

  const handleUpdateChatbot = (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      const promise = updateChatbot({
        variables: { id: Number(id), name: chatbotName },
      });

      toast.promise(promise, {
        loading: "Updating chatbot...",
        success: "Chatbot updated",
        error: "Failed to update chatbot",
      });
    } catch {
      toast.error("Failed to update chatbot");
    }
  };

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
    } catch {
      toast.error("Failed to delete chatbot");
    }
  };

  if (error) return <p>Error: {error.message}</p>;

  console.log("isUpdating", isUpdating);

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
        <LoadingButton
          variant="destructive"
          className="absolute top-1 right-1 md:right-4 md:top-4"
          onClick={() => {
            handleDelete(id);
            redirect("/create-chatbot");
          }}
          isLoading={isDeleting}
          loadingLabel="Deleting"
        >
          <X className="size-4" />
        </LoadingButton>

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

            <LoadingButton
              type="submit"
              isLoading={isUpdating}
              loadingLabel="Saving"
            >
              Update
            </LoadingButton>
          </form>
        </div>

        <h2 className="text-xl font-bold mt-10 mb-3">
          Heres what your AI knows...
        </h2>

        <p>Your chatbot knows the following instructions.</p>

        <div className="mt-5">
          <AddCharacteristicForm id={id} />

          <div className="flex">
            {data?.chatbots.chatbot_characteristics.length === 0 && (
              <div className="w-full py-4 text-sm text-muted-foreground">
                No characteristics yet — add one to get started.
              </div>
            )}

            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {loading && (
                <div className="size-full absolute flex items-center justify-center z-50 cursor-not-allowed bg-sidebar-accent left-0 top-0 rounded">
                  <LoadingSpinner className="text-blue-500 size-9" />
                </div>
              )}

              {data?.chatbots.chatbot_characteristics.map(
                (item: ChatbotCharacteristic) => {
                  return <Characteristic key={item.id} characteristic={item} />;
                }
              )}
            </div>
          </div>
        </div>
      </div>

      {/* {(isAdding || isUpdating || isDeleting) && (
        <LoadingOverlay
          message={
            isAdding ? "Adding..." : isUpdating ? "Updating..." : "Deleting..."
          }
        />
      )} */}
    </section>
  );
};

export default EditChatBot;
