import { db } from "@/server/db";
import { aurinkoClient } from "./aurinko";

type AurinkoDeltaResponse = {
  nextDeltaToken: string;
  [key: string]: unknown;
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

  // Process emails
  // For each email in deltas, upsert into DB
  // This is a complex logic that involves threads, labels, attachments, etc.

  await db.account.update({
    where: { id: accountId },
    data: {
      nextDeltaToken: deltas.nextDeltaToken,
    },
  });

  return deltas;
}
