import { create, insert, search } from "@orama/orama";

type OramaEmail = {
  subject: string;
  body: string;
  from: string;
  to: string[];
  sentAt: string;
  threadId: string;
  embedding: number[];
};

type OramaSearchResult = {
  hits: Array<{ document: OramaEmail }>;
};

export const createOramaInstance = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return create({
    schema: {
      subject: "string",
      body: "string",
      from: "string",
      to: "string[]",
      sentAt: "string",
      threadId: "string",
      embedding: "vector[1536]",
    } as const,
  });
};

export class OramaManager {
  private db: any = null;

  async getDb() {
    this.db ??= createOramaInstance();
    return this.db;
  }

  async indexEmail(email: OramaEmail, embedding: number[]) {
    const db = await this.getDb();
    await insert(db, {
      ...email,
      embedding,
    });
  }

  async searchEmails(query: string) {
    const db = await this.getDb();
    return (await search(db, { term: query })) as OramaSearchResult;
  }

  async searchVector(embedding: number[]) {
    const db = await this.getDb();
    return (await search(db, {
      mode: "vector",
      vector: {
        value: embedding,
        property: "embedding",
      },
      limit: 5,
    })) as OramaSearchResult;
  }
}

export const oramaManager = new OramaManager();
