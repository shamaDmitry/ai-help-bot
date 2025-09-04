export const dynamic = "force-dynamic";

import { Messages } from "@/components/Messages";
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
            <div className="mb-4">
              <p className="text-xs text-gray-500">
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
            </div>
          )}

          <Messages
            messages={data!.chat_sessions.messages}
            chatbotName={data!.chat_sessions.chatbots.name}
            guest={data!.chat_sessions.guests}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSession;
