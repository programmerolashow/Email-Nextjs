import { auth } from "@clerk/nextjs/server";
import { openai } from "@ai-sdk/openai";
import { streamText, type Message } from "ai";
import { getContext } from "@/lib/rag-pipeline";

export const POST = async (req: Request) => {
  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { messages } = (await req.json()) as { messages: Message[] };
  const lastMessage = messages[messages.length - 1];
  if (!lastMessage?.content) {
    return new Response("No messages provided", { status: 400 });
  }
  const context = await getContext(lastMessage.content);

  const result = streamText({
    model: openai("gpt-4o"),
    messages: [
      {
        role: "system",
        content: `You are an AI email assistant. Use the following context from the user's emails to answer their questions. If the answer is not in the context, say you don't know based on the emails.
        
        CONTEXT:
        ${context}`,
      },
      ...messages,
    ],
  });

  return result.toDataStreamResponse();
};
