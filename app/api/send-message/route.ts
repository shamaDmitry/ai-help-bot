import {
  GET_CHATBOT_BY_ID,
  GET_MESSAGES_BY_CHAT_SESSION_ID,
} from "@/graphql/queries/queries";
import { serverClient } from "@/lib/server/serverClient";
import { GetChatbotByIdResponse } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const { name, chat_session_id, chatbot_id, content } = await request.json();

  try {
    // fetch chatbot characteristics
    const { data } = await serverClient.query<GetChatbotByIdResponse>({
      query: GET_CHATBOT_BY_ID,
      variables: { id: chatbot_id },
    });

    const chatBot = data.chatbots;

    if (!chatBot) {
      return NextResponse.json({ error: "Chatbot not found" }, { status: 404 });
    }

    // fetch previous messages in the chat session
    const { data: messagesData } = await serverClient.query({
      query: GET_MESSAGES_BY_CHAT_SESSION_ID,
      variables: { chat_session_id },
      fetchPolicy: "no-cache",
    });

    const previousMessages = messagesData.chat_sessions?.messages;

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

    console.log("systemPrompt", systemPrompt);
  } catch (error) {
    console.log("Error sending message", error);
    return NextResponse.json({ error }, { status: 500 });
  }

  // Simulate AI response (replace this with actual AI integration)
  const aiResponse = `Hello ${name}, you said: "${content}". This is a simulated response from the AI chatbot.`;

  return new Response(JSON.stringify({ content: aiResponse, id: Date.now() }));
}
