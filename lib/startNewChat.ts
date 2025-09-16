import client from "@/graphql/apolloClient";
import {
  INSERT_CHAT_SESSION,
  INSERT_GUEST,
  INSERT_MESSAGE,
} from "@/graphql/mutations/mutations";
import { Guest } from "@/types/types";

export async function startNewChat(
  guestName: string,
  guestEmail: string,
  chatbotId: number
) {
  try {
    // 1. Create a new guest entry
    const guestResult = await client.mutate<
      { insertGuests: Guest },
      { name: string; email: string; created_at: Date }
    >({
      mutation: INSERT_GUEST,
      variables: { name: guestName, email: guestEmail, created_at: new Date() },
    });

    const guestId = guestResult.data?.insertGuests.id;

    // 2. Init a new chat session
    const chatSessionResult = await client.mutate<
      { insertChat_sessions: { id: number } },
      { chatbot_id: number; guest_id: number; created_at: Date }
    >({
      mutation: INSERT_CHAT_SESSION,
      variables: {
        chatbot_id: chatbotId,
        guest_id: guestId!,
        created_at: new Date(),
      },
    });

    const chatSessionId = chatSessionResult.data?.insertChat_sessions.id;

    // 3. Insert initial message
    await client.mutate({
      mutation: INSERT_MESSAGE,
      variables: {
        chat_session_id: chatSessionId,
        sender: "ai",
        content: `Hello! <span>${guestName}</span>!\n How can I assist you today?`,
        created_at: new Date(),
      },
    });

    console.log("New chat session started with ID:", chatSessionId);

    return chatSessionId;
  } catch (error) {
    console.error(error);
  }
}
