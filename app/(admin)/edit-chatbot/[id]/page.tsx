"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/graphql/apolloClient";
import { Copy } from "lucide-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

const EditChatBot = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [url, setUrl] = useState("");

  useEffect(() => {
    const url = `${BASE_URL}/chatbot/${id}`;

    setUrl(url);
  }, [id]);

  return (
    <div className="w-full">
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
    </div>
  );
};

export default EditChatBot;
