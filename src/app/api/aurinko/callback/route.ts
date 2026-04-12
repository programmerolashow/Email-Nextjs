import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";
import { env } from "@/env";
import { db } from "@/server/db";

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }
  return typeof error === "string" ? error : "Unknown error";
};

export const GET = async (req: NextRequest) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const authFn = auth as () => Promise<{ userId?: string }>;
  const { userId } = await authFn();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = req.nextUrl.searchParams;
  const status = params.get("status");
  if (status !== "success") {
    return NextResponse.json({ error: "Failed to link account" }, { status: 400 });
  }

  const code = params.get("code");
  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  try {
    const tokenResponse = await axios.post<{
      access_token: string;
      refresh_token: string;
      account_id: string | number;
    }>(
      "https://api.aurinko.io/v1/auth/token",
      new URLSearchParams({
        client_id: env.AURINKO_CLIENT_ID,
        client_secret: env.AURINKO_CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token, account_id } = tokenResponse.data;

    await db.account.upsert({
      where: { id: account_id.toString() },
      update: {
        accessToken: access_token,
      },
      create: {
        id: account_id.toString(),
        userId,
        accessToken: access_token,
        refreshToken: refresh_token,
        provider: "Aurinko",
      },
    });

    return NextResponse.redirect(new URL("/", req.url));
  } catch (error: unknown) {
    console.error("Error exchanging Aurinko token:", error);
    return NextResponse.json({ error: getErrorMessage(error) }, { status: 500 });
  }
};
