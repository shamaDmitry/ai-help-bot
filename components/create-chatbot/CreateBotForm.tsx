"use client";

import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { CREATE_CHATBOT } from "@/graphql/mutations/mutations";
import { CreateChatbotMutation, CreateChatbotVariables } from "@/types/graphql";
import { useMutation } from "@apollo/client/react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const CreateBotForm = () => {
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
    <form onSubmit={handleSubmit} className="flex gap-4 md:flex-row flex-col">
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
  );
};

export default CreateBotForm;
