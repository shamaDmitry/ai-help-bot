"use client";

import { ChatbotCharacteristic } from "@/types/types";
import { CircleX } from "lucide-react";
import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client/react";
import { REMOVE_CHARACTERISTIC } from "@/graphql/mutations/mutations";
import { toast } from "sonner";

interface CharacteristicProps {
  characteristic: ChatbotCharacteristic;
}

const Characteristic: FC<CharacteristicProps> = ({ characteristic }) => {
  const [removeCharacteristic] = useMutation(REMOVE_CHARACTERISTIC, {
    refetchQueries: ["GetChatbotById"],
  });

  const handleDelete = async (characteristic: ChatbotCharacteristic) => {
    try {
      await removeCharacteristic({
        variables: {
          id: characteristic.id,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative py-2.5 px-4 border rounded-md">
      {characteristic.content}

      <Button
        className="absolute top-1 right-1 cursor-pointer hover:opacity-50"
        variant="destructive"
        size="icon"
        onClick={() => {
          const promise = handleDelete(characteristic);

          toast.promise(promise, {
            loading: "Removing characteristic...",
            success: "Characteristic removed",
            error: "Error removing characteristic",
          });
        }}
      >
        <CircleX className="size-5 text-white" />
      </Button>
    </div>
  );
};

export default Characteristic;
