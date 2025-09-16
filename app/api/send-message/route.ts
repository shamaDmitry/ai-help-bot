import { INSERT_MESSAGE } from "@/graphql/mutations/mutations";
import {
  GET_CHATBOT_BY_ID,
  GET_MESSAGES_BY_CHAT_SESSION_ID,
} from "@/graphql/queries/queries";
import { serverClient } from "@/lib/server/serverClient";
import {
  GetChatbotByIdResponse,
  GetChatSessionMessagesResponse,
} from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const { name, chat_session_id, chatbot_id, content } = await request.json();

  try {
    // 1) fetch chatbot characteristics
    const { data } = await serverClient.query<GetChatbotByIdResponse>({
      query: GET_CHATBOT_BY_ID,
      variables: { id: chatbot_id },
    });

    const chatBot = data?.chatbots;

    if (!chatBot) {
      return NextResponse.json({ error: "Chatbot not found" }, { status: 404 });
    }

    // 2) fetch previous messages in the chat session
    const { data: messagesData } =
      await serverClient.query<GetChatSessionMessagesResponse>({
        query: GET_MESSAGES_BY_CHAT_SESSION_ID,
        variables: { chat_session_id },
        fetchPolicy: "no-cache",
      });

    const previousMessages = messagesData?.chat_sessions?.messages || [];

    const formattedPreviousMessages: ChatCompletionMessageParam[] =
      previousMessages.map((message) => {
        return {
          role: message.sender === "ai" ? "system" : "user",
          name: message.sender === "ai" ? "system" : name,
          content: message.content,
        };
      });

    const systemPrompt = chatBot.chatbot_characteristics
      .map((c) => c.content)
      .join(" + ");

    const messages: ChatCompletionMessageParam[] = [
      {
        role: "system",
        name: "system",
        content: `You are ${chatBot.name}. You are a helpful assistant talking to ${name}. Answer as concisely as possible. If you don't know the answer, just say that you don't know, don't try to make up an answer. Here are some key information that you need to be aware of, these are elements you may be asked about: ${systemPrompt}`,
      },
      ...formattedPreviousMessages,
      { role: "user", name: name, content: content },
    ];

    // 3) send the messages to OpenAI
    const openaiResponse = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-5",
    });

    console.log("openaiResponse", JSON.stringify(openaiResponse, null, 2));

    const aiResponse = openaiResponse?.choices?.[0]?.message?.content?.trim();

    if (!aiResponse) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    // 4) save the user's message in database
    await serverClient.mutate({
      mutation: INSERT_MESSAGE,
      variables: {
        chat_session_id,
        content,
        sender: "user",
      },
    });

    // 5) save the AI's response in database
    const aiMessageResult = await serverClient.mutate<{
      insertMessage: { id: number };
    }>({
      mutation: INSERT_MESSAGE,
      variables: {
        chat_session_id,
        content: aiResponse,
        sender: "ai",
      },
    });

    // 6) return the AI's response to the client
    return NextResponse.json({
      id: aiMessageResult?.data?.insertMessage?.id,
      content: aiResponse,
    });
  } catch (error) {
    console.log("Error sending message", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
