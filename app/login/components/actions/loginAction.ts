"use server"
import { LoginFormValues } from "@/schemas/loginSchema"

export interface LoginResponse {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  accessToken: string;
}
const apiUrl=`${process.env.BACK_END_URL}/api/users/login`
console.log(apiUrl)
export async function loginAction(
  payload: LoginFormValues
): Promise<LoginResponse> {
  const response = await fetch(
    apiUrl,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    }
  );
  console.log(response)
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || "Invalid email or password.");
  }

  return data;
}