import { Card, CardContent } from "@/components/ui/card";
import { GET_CHATBOTS_BY_USER } from "@/graphql/queries/queries";
import { serverClient } from "@/lib/server/serverClient";
import { GetChatbotByUserData } from "@/types/types";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

const ViewChatbots = async () => {
  const { userId } = await auth();
  if (!userId) return;

  const { data, error } = await serverClient.query<GetChatbotByUserData>({
    query: GET_CHATBOTS_BY_USER,
  });

  console.log({ data, error });

  return (
    <div className="w-full">
      <Card>
        <CardContent>
          <div className="flex gap-4 flex-col">
            {data?.chatbotsByUser.map((chatbot) => {
              return (
                <Link href={`/edit-chatbot/${chatbot.id}`} key={chatbot.id}>
                  {chatbot.name}
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewChatbots;
