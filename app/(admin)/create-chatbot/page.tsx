import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const CreateChatBot = () => {
  return (
    <Card>
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

        <form action="" className="flex gap-4 md:flex-row flex-col">
          <Input placeholder="Chatbot Name" />

          <Button>Create</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateChatBot;
