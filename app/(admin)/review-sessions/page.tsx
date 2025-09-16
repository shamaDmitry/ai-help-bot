import ChatbotSessions from "@/components/ChatbotSessions";
import Title from "@/components/Title";
import { Card, CardContent } from "@/components/ui/card";
import { GET_USER_CHATBOTS } from "@/graphql/queries/queries";
import { serverClient } from "@/lib/server/serverClient";
import {
  GetUserChatbotsResponse,
  GetUserChatbotsVariables,
} from "@/types/types";
import { auth } from "@clerk/nextjs/server";

const ReviewSessions = async () => {
  const { userId } = await auth();
  if (!userId) return;

  const { data } = await serverClient.query<
    GetUserChatbotsResponse,
    GetUserChatbotsVariables
  >({
    query: GET_USER_CHATBOTS,
    variables: { userId: userId },
  });

  return (
    <div className="w-full">
      <Card>
        <CardContent>
          <Title>Chat sessions</Title>

          <p>
            Review all the chat sessions the chat bots have had with your
            customers.
          </p>

          <ChatbotSessions chatbots={data?.chatbotsByUser || []} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSessions;
