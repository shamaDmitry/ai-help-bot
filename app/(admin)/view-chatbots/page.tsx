import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GET_CHATBOTS_BY_USER } from "@/graphql/queries/queries";
import { serverClient } from "@/lib/server/serverClient";
import { Chatbot, GetChatbotByUserData } from "@/types/types";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

const ViewChatbots = async () => {
  const { userId } = await auth();
  if (!userId) return;

  // TODO get Chatbots by user
  const { data, error } = await serverClient.query<GetChatbotByUserData>({
    query: GET_CHATBOTS_BY_USER,
    variables: { clerk_user_id: userId },
  });

  const sortedChatbots: Chatbot[] = [...(data?.chatbotsByUser || [])].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <div className="w-full">
      <Card className="min-h-full">
        <CardContent>
          <div className="flex gap-4 flex-col">
            {sortedChatbots.length === 0 && (
              <div className="flex gap-4 items-center justify-between">
                <p>You have no chatbots. Create one!</p>

                <Link href="/create-chatbot">
                  <Button>Create Chatbot</Button>
                </Link>
              </div>
            )}

            {sortedChatbots.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedChatbots.map((chatbot) => {
                  return (
                    <Link
                      key={chatbot.id}
                      href={`/edit-chatbot/${chatbot.id}`}
                      className="w-full"
                    >
                      <div className="border p-4 rounded hover:bg-accent cursor-pointer flex items-center gap-4 flex-col md:flex-row text-center md:text-left">
                        <Avatar
                          seed={chatbot.id.toString()}
                          className="size-16"
                        />

                        <div>
                          <h2 className="font-bold text-lg">{chatbot.name}</h2>

                          <p className="text-muted-foreground mb-1">
                            Created on{" "}
                            {new Date(chatbot.created_at).toLocaleDateString(
                              undefined,
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>

                          <p className="text-sm">
                            Number of sessions: {chatbot.chat_sessions.length}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewChatbots;
