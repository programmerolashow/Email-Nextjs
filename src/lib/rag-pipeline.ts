import { getEmbedding } from "./openai";
import { oramaManager } from "./orama";

type EmailDocument = {
  subject: string;
  body: string;
  from: string;
  to: string[];
  sentAt: string;
  threadId: string;
  embedding: number[];
};

export async function getContext(query: string) {
  const embedding = await getEmbedding(query);
  const results = await oramaManager.searchVector(embedding);

  return results.hits
    .map((hit) => hit.document as EmailDocument)
    .map((doc) => `From: ${doc.from}\nSubject: ${doc.subject}\nBody: ${doc.body}`)
    .join("\n\n---\n\n");
}
