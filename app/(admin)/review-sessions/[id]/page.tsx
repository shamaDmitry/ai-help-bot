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

  // data: {
  //   chat_sessions: {
  //     id: chatSessionId,
  //     created_at,
  //     messages,
  //     chatbots: { name },
  //     guests: { name: guestName, email },
  //   },
  // },

  const { data, error } = await serverClient.query<
    GetChatSessionMessagesResponse,
    GetChatSessionMessagesVariables
  >({
    query: GET_CHAT_SESSION_MESSAGES,
    variables: { id: Number(id) },
  });

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full">
      <Card>
        <CardContent>
          <Title>Session Review</Title>
          {data?.chat_sessions && (
            <>
              <p className="text-xs text-gray-300">
                Started at{" "}
                {new Date(data.chat_sessions.created_at).toLocaleString()}
              </p>

              <p className="mt-2">
                Between{" "}
                <span className="font-bold">
                  {data.chat_sessions.chatbots.name}
                </span>{" "}
                and{" "}
                <span className="font-bold">
                  {data.chat_sessions.guests.name} (
                  {data.chat_sessions.guests.email})
                </span>
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSession;
