import { db } from "@/server/db";
import { aurinkoClient } from "./aurinko";
import { getEmbedding } from "./openai";
import { oramaManager } from "./orama";

type AurinkoEmail = {
  id: string;
  threadId: string;
  subject: string;
  body: string;
  from: { name?: string; address: string };
  to: { name?: string; address: string }[];
  cc: { name?: string; address: string }[];
  bcc: { name?: string; address: string }[];
  sentAt: string;
  snippet: string;
};

type AurinkoDeltaResponse = {
  nextDeltaToken: string;
  items: AurinkoEmail[];
};

export async function syncEmails(accountId: string) {
  const account = await db.account.findUnique({
    where: { id: accountId },
  });

  if (!account) {
    throw new Error("Account not found");
  }

  const { accessToken, nextDeltaToken } = account;
  let deltaToken = nextDeltaToken;

  if (!deltaToken) {
    const syncData = (await aurinkoClient.startSync(accessToken)) as { nextDeltaToken: string };
    deltaToken = syncData.nextDeltaToken;
  }

  const deltas = (await aurinkoClient.getDelta(accessToken, deltaToken)) as AurinkoDeltaResponse;

  // Batch process emails (50 at a time)
  const batchSize = 50;
  for (let i = 0; i < deltas.items.length; i += batchSize) {
    const batch = deltas.items.slice(i, i + batchSize);
    await Promise.all(batch.map(email => processEmail(accountId, email)));
  }

  await db.account.update({
    where: { id: accountId },
    data: {
      nextDeltaToken: deltas.nextDeltaToken,
    },
  });

  return deltas;
}

async function processEmail(accountId: string, email: AurinkoEmail) {
  try {
    // 1. Thread management
    await db.thread.upsert({
      where: { id: email.threadId },
      update: {
        subject: email.subject,
        lastMessageDate: new Date(email.sentAt),
        snippet: email.snippet,
      },
      create: {
        id: email.threadId,
        accountId,
        subject: email.subject,
        lastMessageDate: new Date(email.sentAt),
        snippet: email.snippet,
        quantity: 1,
      },
    });

    // 2. Email Address management
    const upsertAddress = async (addr: { name?: string; address: string }) => {
      return await db.emailAddress.upsert({
        where: { address: addr.address },
        update: { name: addr.name },
        create: { address: addr.address, name: addr.name },
      });
    };

    const fromAddr = await upsertAddress(email.from);

    // 3. Save Email
    const savedEmail = await db.email.upsert({
      where: { id: email.id },
      update: {
        subject: email.subject,
        body: email.body,
        sentAt: new Date(email.sentAt),
        bodySnippet: email.snippet,
      },
      create: {
        id: email.id,
        threadId: email.threadId,
        accountId,
        fromId: fromAddr.id,
        subject: email.subject,
        body: email.body,
        sentAt: new Date(email.sentAt),
        bodySnippet: email.snippet,
        internetMessageId: `aurinko-${email.id}`,
      },
    });

    // 4. Indexing in Orama
    const embedding = await getEmbedding(`${email.subject}\n${email.snippet}`);
    await oramaManager.indexEmail({
      subject: email.subject,
      body: email.body,
      from: email.from.address,
      to: email.to.map(t => t.address),
      sentAt: email.sentAt,
      threadId: email.threadId,
      embedding,
    }, embedding);

    return savedEmail;
  } catch (error) {
    console.error(`Error processing email ${email.id}:`, error);
  }
}
