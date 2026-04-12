import axios from "axios";
import { env } from "@/env";

const AURINKO_BASE_URL = "https://api.aurinko.io/v1";

type AurinkoResponse = Record<string, unknown>;

export class AurinkoClient {
  private clientId: string;
  private clientSecret: string;

  constructor() {
    this.clientId = env.AURINKO_CLIENT_ID;
    this.clientSecret = env.AURINKO_CLIENT_SECRET;
  }

  async getAccount(accessToken: string) {
    const response = await axios.get<AurinkoResponse>(`${AURINKO_BASE_URL}/account`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }

  async startSync(accessToken: string) {
    const response = await axios.post<AurinkoResponse>(
      `${AURINKO_BASE_URL}/email/sync`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }

  async getDelta(accessToken: string, deltaToken: string) {
    const response = await axios.get<AurinkoResponse>(`${AURINKO_BASE_URL}/email/sync/deltas`, {
      params: {
        deltaToken,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }

  // Add more methods as needed for sending, receiving, etc.
}

export const aurinkoClient = new AurinkoClient();
