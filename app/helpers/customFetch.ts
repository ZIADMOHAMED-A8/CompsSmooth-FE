"use server";

import { auth, signIn } from "@/app/auth";

type FetchInput = Parameters<typeof fetch>[0];
type FetchInit = Parameters<typeof fetch>[1];

type RefreshTokenResponse = {
  accessToken?: string;
  refreshToken?: string;
  data?: {
    accessToken?: string;
    refreshToken?: string;
  };
};

const refreshTokenPath = "/api/users/refresh-token";

function getRefreshTokenUrl() {
  return `${process.env.BACK_END_URL}${refreshTokenPath}`;
}

function isRefreshTokenRequest(input: FetchInput) {
  const url = input instanceof Request ? input.url : input.toString();
  return url.includes(refreshTokenPath);
}

function getRefreshedTokens(data: RefreshTokenResponse) {
  return {
    accessToken: data.data?.accessToken ?? data.accessToken,
    refreshToken: data.data?.refreshToken ?? data.refreshToken,
  };
}

async function refreshAccessToken(refreshToken: string) {
  const response = await fetch(getRefreshTokenUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as RefreshTokenResponse;
  const tokens = getRefreshedTokens(data);

  if (!tokens.accessToken) {
    return null;
  }

  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken ?? refreshToken,
  };
}

export async function customFetch(
  input: FetchInput,
  init?: FetchInit
): Promise<Response> {
  const request = new Request(input, init);
  const retryRequest = request.clone();
  const response = await fetch(request);
  const authorization = retryRequest.headers.get("Authorization");

  if (response.status !== 401 || !authorization || isRefreshTokenRequest(input)) {
    return response;
  }

  const session = await auth();

  if (!session?.refreshToken) {
    return response;
  }

  const refreshedTokens = await refreshAccessToken(session.refreshToken);

  if (!refreshedTokens) {
    return response;
  }

  await signIn("credentials", {
    accessToken: refreshedTokens.accessToken,
    refreshToken: refreshedTokens.refreshToken,
    redirect: false,
  });

  const retryHeaders = new Headers(retryRequest.headers);
  retryHeaders.set("Authorization", `Bearer ${refreshedTokens.accessToken}`);

  return fetch(
    new Request(retryRequest, {
      headers: retryHeaders,
    })
  );
}
