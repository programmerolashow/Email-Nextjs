import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { chatCompletion } from "@/lib/openai";
import { getContext } from "@/lib/rag-pipeline";

const isChatMessage = (value: unknown): value is { role: string; content: string } => {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as { role?: unknown }).role === "string" &&
    typeof (value as { content?: unknown }).content === "string"
  );
};

export const POST = async (req: NextRequest) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const authFn = auth as () => Promise<{ userId?: string }>;
  const { userId } = await authFn();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as unknown;
  if (typeof body !== "object" || body === null || !("messages" in body)) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const rawMessages = (body as { messages?: unknown }).messages;
  if (!Array.isArray(rawMessages)) {
    return NextResponse.json({ error: "Invalid messages array" }, { status: 400 });
  }

  const messages = rawMessages
    .filter(isChatMessage)
    .map((message) => ({
      role: message.role as "system" | "user" | "assistant",
      content: message.content,
    }));

  if (messages.length === 0) {
    return NextResponse.json({ error: "No messages provided" }, { status: 400 });
  }

  const lastMessage = messages[messages.length - 1].content;
  const context = await getContext(lastMessage);

  const systemPrompt = {
    role: "system" as const,
    content: `You are an AI email assistant. Use the following context from the user's emails to answer their questions. If the answer is not in the context, say you don't know based on the emails.

        CONTEXT:
        ${context}`,
  };

  const completion = await chatCompletion([systemPrompt, ...messages]);

  return NextResponse.json({ message: completion?.content ?? "" });
};
