import { Card, CardContent } from "@/components/ui/card";
import { GET_CHATBOTS_BY_USER } from "@/graphql/queries/queries";
import { serverClient } from "@/lib/server/serverClient";
import {
  GetChatbotByUserData,
  GetChatbotByUserDataVariables,
} from "@/types/types";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

const ViewChatbots = async () => {
  const { userId } = await auth();
  if (!userId) return;

  const { data } = await serverClient.query<
    GetChatbotByUserData,
    GetChatbotByUserDataVariables
  >({
    query: GET_CHATBOTS_BY_USER,
    variables: {
      clerc_user_id: userId,
    },
  });

  console.log("data", data);

  return (
    <div className="w-full">
      <Card>
        <CardContent>ViewChatbots</CardContent>
      </Card>
    </div>
  );
};

export default ViewChatbots;
