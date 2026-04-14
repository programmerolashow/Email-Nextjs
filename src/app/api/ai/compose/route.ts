import { auth } from "@clerk/nextjs/server";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const POST = async (req: Request) => {
  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { subject, prompt } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    system: "You are an AI email assistant. Help the user complete their email. Provide only the continuation of the email, without any pleasantries or introductory text unless explicitly asked. Maintain the tone and style of the existing content.",
    prompt: `Subject: ${subject}\n\nExisting Content:\n${prompt}\n\nContinue the email:`,
  });

  return result.toDataStreamResponse();
};
