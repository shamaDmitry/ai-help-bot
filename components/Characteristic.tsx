import { ChatbotCharacteristic } from "@/types/types";
import { CircleX, OctagonX } from "lucide-react";
import { FC } from "react";

interface CharacteristicProps {
  characteristic: ChatbotCharacteristic;
}

const Characteristic: FC<CharacteristicProps> = ({ characteristic }) => {
  return (
    <div className="relative p-10 bg-white border rounded-md">
      {characteristic.content}

      <CircleX className="size-6 text-white fill-red-500 absolute top-1 right-1 cursor-pointer hover:opacity-50" />
    </div>
  );
};

export default Characteristic;
