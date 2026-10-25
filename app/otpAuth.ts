import "server-only";

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getToken, type JWT } from "next-auth/jwt";
import { headers } from "next/headers";

export type OtpPurpose = "SIGN_UP" | "PASSWORD_RESET";

export type OtpFlowSession = {
  email: string;
  purpose: OtpPurpose;
  expiresAt: string;
  resendAt: string;
  verificationToken?: string;
};

const authUrl = process.env.AUTH_URL ?? process.env.NEXTAUTH_URL;
const secureCookie = authUrl?.startsWith("https://") ?? false;
export const otpSessionCookieName = `${secureCookie ? "__Secure-" : ""}authjs.otp-flow-session`;

const otpAuth = NextAuth({
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 15 * 60 },
  useSecureCookies: secureCookie,
  cookies: {
    sessionToken: {
      name: otpSessionCookieName,
      options: { httpOnly: true, sameSite: "lax", path: "/", secure: secureCookie },
    },
    callbackUrl: {
      name: "authjs.otp-flow-callback-url",
      options: { httpOnly: true, sameSite: "lax", path: "/", secure: secureCookie },
    },
    csrfToken: {
      name: "authjs.otp-flow-csrf-token",
      options: { httpOnly: true, sameSite: "lax", path: "/", secure: secureCookie },
    },
  },
  providers: [
    Credentials({
      id: "otp-flow",
      name: "OTP verification flow",
      credentials: { flow: { type: "text" } },
      async authorize(credentials) {
        if (typeof credentials?.flow !== "string") return null;
        try {
          const flow = JSON.parse(credentials.flow) as OtpFlowSession;
          if (!flow.email || !flow.expiresAt || !flow.resendAt || !["SIGN_UP", "PASSWORD_RESET"].includes(flow.purpose)) return null;
          return { id: "otp-flow", accessToken: "", refreshToken: "", flow };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === "otp-flow" && user) {
        token.otpFlow = (user as typeof user & { flow: OtpFlowSession }).flow;
      }
      return token;
    },
  },
});

export async function saveOtpFlow(flow: OtpFlowSession) {
  await otpAuth.signIn("otp-flow", { flow: JSON.stringify(flow), redirect: false });
}

export async function clearOtpFlow() {
  await otpAuth.signOut({ redirect: false });
}

export async function readOtpFlow(): Promise<OtpFlowSession | null> {
  const requestHeaders = await headers();
  const token = await getToken({
    req: { headers: requestHeaders },
    secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
    cookieName: otpSessionCookieName,
    secureCookie,
  });
  const flow = (token as JWT & { otpFlow?: OtpFlowSession } | null)?.otpFlow;
  if (!flow) return null;
  if (!flow.verificationToken && (!Number.isFinite(Date.parse(flow.expiresAt)) || Date.parse(flow.expiresAt) <= Date.now())) return null;
  return flow;
}
