import { Avatar } from "@/components/Avatar";
import CreateBotForm from "@/components/create-chatbot/CreateBotForm";
import { Card, CardContent } from "@/components/ui/card";

const CreateChatBot = () => {
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

          <CreateBotForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateChatBot;
