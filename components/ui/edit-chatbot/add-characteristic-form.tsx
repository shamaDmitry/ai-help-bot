"use client";

import { ADD_CHARACTERISTIC } from "@/graphql/mutations/mutations";
import { useMutation } from "@apollo/client/react";
import { FC, useState } from "react";
import { toast } from "sonner";
import LoadingButton from "@/components/ui/loading-button";
import { Input } from "@/components/ui/input";

interface AddCharacteristicFormProps {
  id: number;
}

const AddCharacteristicForm: FC<AddCharacteristicFormProps> = ({ id }) => {
  const [newCharacteristic, setNewCharacteristic] = useState("");

  const [addCharacteristic, { loading: isAdding }] = useMutation(
    ADD_CHARACTERISTIC,
    {
      refetchQueries: ["GetChatbotById"],
    }
  );

  const handleAddCharacteristic = async (content: string) => {
    try {
      const promise = addCharacteristic({
        variables: {
          chatbotId: Number(id),
          content,
          created_at: new Date().toISOString(),
        },
      });

      toast.promise(promise, {
        loading: "Adding characteristic...",
        success: "Characteristic added",
        error: "Failed to add characteristic",
      });
    } catch {
      toast.error("Failed to add characteristic");
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddCharacteristic(newCharacteristic);
          setNewCharacteristic("");
        }}
        className="flex gap-3 mb-4"
      >
        <Input
          type="text"
          placeholder="Example: If customer asks for prices, provide pricing page: example.com/pricing"
          value={newCharacteristic}
          onChange={(e) => setNewCharacteristic(e.target.value)}
        />

        <LoadingButton
          type="submit"
          disabled={!newCharacteristic}
          isLoading={isAdding}
          loadingLabel="Adding"
        >
          Add
        </LoadingButton>
      </form>
    </>
  );
};

export default AddCharacteristicForm;
