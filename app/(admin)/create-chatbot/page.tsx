"use client";

import { Avatar } from "@/components/Avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { CREATE_CHATBOT } from "@/graphql/mutations/mutations";
import { CreateChatbotMutation, CreateChatbotVariables } from "@/types/graphql";
import { useMutation } from "@apollo/client/react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const CreateChatBot = () => {
  const { user } = useUser();
  const [name, setName] = useState("");

  const router = useRouter();

  const [createChatBot, { loading }] = useMutation<
    CreateChatbotMutation,
    CreateChatbotVariables
  >(CREATE_CHATBOT);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const result = await createChatBot({
        variables: {
          clerk_user_id: user?.id || "",
          name,
          created_at: new Date().toISOString(),
        },
      });

      setName("");

      const chatbot = result.data?.insertChatbots as
        | CreateChatbotMutation["insertChatbots"]
        | undefined;

      if (chatbot?.id) {
        router.push(`/view-chatbots/${chatbot.id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full">
      <Card className="max-w-2xl mx-auto">
        <CardContent>
          <div className="flex flex-col items-center justify-center md:flex-row w-full gap-4 mb-4">
            <Avatar seed="create-chatbot" />

            <div>
              <h1 className="text-xl lg:text-3xl font-semibold">Create</h1>

              <h2 className="font-light">
                Create your own chatbot with ease using our intuitive interface.
              </h2>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex gap-4 md:flex-row flex-col"
          >
            <Input
              placeholder="Chatbot Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <LoadingButton
              type="submit"
              isLoading={loading}
              loadingLabel="Creating bot..."
              disabled={loading || !name}
            >
              Create bot
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateChatBot;
