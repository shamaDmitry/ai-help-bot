export const dynamic = "force-dynamic";

import Title from "@/components/Title";
import { Card, CardContent } from "@/components/ui/card";
import { GET_CHAT_SESSION_MESSAGES } from "@/graphql/queries/queries";
import { serverClient } from "@/lib/server/serverClient";
import {
  GetChatSessionMessagesResponse,
  GetChatSessionMessagesVariables,
} from "@/types/types";

const ReviewSession = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const {
    data: {
      chat_sessions: {
        id: chatSessionId,
        created_at,
        messages,
        chatbots: { name },
        guests: { name: guestName, email },
      },
    },
  } = await serverClient.query<
    GetChatSessionMessagesResponse,
    GetChatSessionMessagesVariables
  >({
    query: GET_CHAT_SESSION_MESSAGES,
    variables: { id: Number(id) },
  });

  return (
    <div className="w-full">
      <Card>
        <CardContent>
          <Title>Session Review</Title>

          <p>Started at {new Date(created_at).toLocaleString()}</p>

          <p>
            Between {name} and{" "}
            <span className="font-medium">
              {guestName} ({email})
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSession;
