import client from "@/graphql/apolloClient";
import {
  INSERT_CHAT_SESSION,
  INSERT_GUEST,
  INSERT_MESSAGE,
} from "@/graphql/mutations/mutations";
import { gql } from "@apollo/client";

async function startNewChat(
  guestName: string,
  guestEmail: string,
  chatbotId: number
) {
  try {
    // 1. Create a new guest entry
    const guestResult = await client.mutate({
      mutation: INSERT_GUEST,
      variables: { name: guestName, email: guestEmail },
    });
    const guestId = guestResult.data.insertGuest.id;

    // 2. Init a new chat session
    const chatSessionResult = await client.mutate({
      mutation: INSERT_CHAT_SESSION,
      variables: {},
    });
    const chatSessionId = chatSessionResult.data.insertChat_sessions.id;

    // 3. Insert initial message

    await client.mutate({
      mutation: INSERT_MESSAGE,
      variables: {
        chat_session_id: chatSessionId,
        sender: "ai",
        content: `Hello! ${guestName}!\n How can I assist you today?`,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
