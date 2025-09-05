import client from "@/graphql/apolloClient";
import {
  INSERT_CHAT_SESSION,
  INSERT_GUEST,
  INSERT_MESSAGE,
} from "@/graphql/mutations/mutations";
import { gql } from "@apollo/client";

export async function startNewChat(
  guestName: string,
  guestEmail: string,
  chatbotId: number
) {
  try {
    // 1. Create a new guest entry
    const guestResult = await client.mutate({
      mutation: INSERT_GUEST,
      variables: { name: guestName, email: guestEmail, created_at: new Date() },
    });

    const guestData = guestResult.data as { insertGuests: { id: number } };
    const guestId = guestData.insertGuests.id;

    console.log("guestId", guestId);

    // 2. Init a new chat session
    const chatSessionResult = await client.mutate({
      mutation: INSERT_CHAT_SESSION,
      variables: { created_at: new Date() },
    });

    const chatSessionData = chatSessionResult.data as {
      insertChat_sessions: { id: number };
    };
    const chatSessionId = chatSessionData.insertChat_sessions.id;
    console.log("chatSessionResult", chatSessionResult);

    // 3. Insert initial message
    await client.mutate({
      mutation: INSERT_MESSAGE,
      variables: {
        chat_session_id: chatSessionId,
        sender: "ai",
        content: `Hello! ${guestName}!\n How can I assist you today?`,
      },
    });

    console.log("New chat session started with ID:", chatSessionId);

    return chatSessionId;
  } catch (error) {
    console.error(error);
  }
}
