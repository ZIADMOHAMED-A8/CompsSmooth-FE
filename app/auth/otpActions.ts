"use server";

import { clearOtpFlow, readOtpFlow, saveOtpFlow, type OtpPurpose } from "@/app/otpAuth";

type ApiError = Error & { status?: number };

async function post<T>(path: string, body: Record<string, string>): Promise<T> {
  const response = await fetch(`${process.env.BACK_END_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const result = await response.json().catch(() => null);
  if (!response.ok) {
    const fallback = response.status === 400 ? "That verification code is invalid or has expired. Request a new code and try again."
      : response.status === 401 ? "Your verification session has expired. Please verify your email again."
      : response.status === 403 ? "This verification code does not match this email and request."
      : response.status === 429 ? "Please wait before requesting another verification code."
      : "Something went wrong. Please try again.";
    const error = new Error(result?.message || fallback) as ApiError;
    error.status = response.status;
    throw error;
  }
  return result as T;
}

export async function requestOtpAction(email: string, purpose: OtpPurpose) {
  const response = await post<{ success: boolean; data: { expiresAt: string } }>("/api/otp/request", { email, purpose });
  const resendAt = new Date(Date.now() + 60_000).toISOString();
  const flow = { email, purpose, expiresAt: response.data.expiresAt, resendAt };
  await saveOtpFlow(flow);
  return { ...response, data: { ...response.data, resendAt } };
}

export async function verifyOtpAction(email: string, purpose: OtpPurpose, otp: string) {
  const flow = await readOtpFlow();
  if (!flow || flow.email !== email || flow.purpose !== purpose) {
    throw new Error("This verification request has expired. Request a new code to continue.");
  }
  const response = await post<{ success: boolean; data: { verificationToken: string } }>("/api/otp/verify", { email, purpose, otp });
  await saveOtpFlow({ ...flow, verificationToken: response.data.verificationToken });
  return { success: response.success, data: { verified: true } };
}

export async function getOtpSessionAction(purpose: OtpPurpose) {
  const flow = await readOtpFlow();
  if (!flow || flow.purpose !== purpose) return null;
  return {
    email: flow.email,
    purpose: flow.purpose,
    expiresAt: flow.expiresAt,
    resendAt: flow.resendAt,
    verified: !!flow.verificationToken,
  };
}

export async function clearOtpSessionAction() {
  await clearOtpFlow();
}

export async function resetPasswordAction(email: string, password: string) {
  const flow = await readOtpFlow();
  if (!flow?.verificationToken || flow.email !== email || flow.purpose !== "PASSWORD_RESET") {
    throw new Error("Your verification session has expired. Please verify your email again.");
  }
  const result = await post("/api/users/reset-password", { email, password, verificationToken: flow.verificationToken });
  await clearOtpFlow();
  return result;
}
