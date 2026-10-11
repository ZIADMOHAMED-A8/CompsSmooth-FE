"use server";

import { SignupFormValues } from "@/schemas/signupSchema";
import { signIn } from "@/app/auth"; 
import { customFetch } from "@/app/helpers/customFetch";

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
  const {  ...signupData } = payload;

  const response = await customFetch(
    `${process.env.BACK_END_URL}/api/users/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(signupData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || "Unable to create your account."
    );
  }
  console.log(data)
        await signIn("credentials", {
        accessToken: data.data.accessToken ,
        refreshToken: data.data.refreshToken ,
        redirect:false
        })

  return data;
}
