"use server";

import { SignupFormValues } from "@/schemas/signupSchema";
import { signIn } from "@/app/auth"; 
import { customFetch } from "@/app/helpers/customFetch";
import { clearOtpFlow, readOtpFlow } from "@/app/otpAuth";

export interface SignupResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
}

export async function signupAction(
  payload: SignupFormValues
): Promise<SignupResponse> {
  const flow = await readOtpFlow();
  if (!flow?.verificationToken || flow.purpose !== "SIGN_UP" || flow.email !== payload.email.trim().toLowerCase()) {
    throw new Error("Your verification session has expired. Please verify your email again.");
  }

  const response = await customFetch(
    `${process.env.BACK_END_URL}/api/users/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...payload, verificationToken: flow.verificationToken }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || "Unable to create your account."
    );
  }
  await signIn("credentials", {
    accessToken: data.data.accessToken,
    refreshToken: data.data.refreshToken,
    redirect: false,
  });
  await clearOtpFlow();

  return data;
}
