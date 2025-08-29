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

  console.log("data", data);

  return (
    <div className="w-full">
      <Card>
        <CardContent>
          ReviewSessions dassad
          {process.env.NEXT_PUBLIC_VERCEL_ENV}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSessions;
