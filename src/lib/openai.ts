import { OpenAI } from "openai";
import { env } from "@/env";

const openaiApiKey = env.OPENAI_API_KEY;
if (!openaiApiKey) {
  throw new Error("OPENAI_API_KEY is required");
}

export const openai = new OpenAI({
    apiKey: openaiApiKey,
});

export async function getEmbedding(text: string) {
    const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text.replace(/\n/g, " "),
    });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return response.data?.[0]?.embedding ?? [];
}

export async function chatCompletion(messages: OpenAI.Chat.ChatCompletionMessageParam[]) {
    const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages,
    });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return response.choices?.[0]?.message ?? null;
}
