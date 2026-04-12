"use client";

export const useAurinko = () => {
  const linkAccount = (service: "Google" | "Office365") => {
    const clientId = process.env.NEXT_PUBLIC_AURINKO_CLIENT_ID;
    if (!clientId) {
      throw new Error("Missing NEXT_PUBLIC_AURINKO_CLIENT_ID environment variable");
    }

    const baseUrl = "https://api.aurinko.io/v1/auth/authorize";
    const params = new URLSearchParams({
      client_id: clientId,
      serviceType: service.toLowerCase(),
      responseType: "code",
      returnUrl: `${window.location.origin}/api/aurinko/callback`,
    });

    window.location.href = `${baseUrl}?${params.toString()}`;
  };

  return { linkAccount };
};
