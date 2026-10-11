"use server";

import {
  CreateCheckoutSessionPayload,
  CreateCheckoutSessionResponse,
} from "../types/plan.types";
import { auth } from "@/app/auth";
import { customFetch } from "@/app/helpers/customFetch";

const apiUrl = `${process.env.BACK_END_URL}/api/users/create-checkout-session`;
export async function createCheckoutSessionAction(
  payload: CreateCheckoutSessionPayload
): Promise<CreateCheckoutSessionResponse> {
const session = await auth();
if (!session?.accessToken) {
  throw new Error("please log in");
}
const token=`Bearer ${session.accessToken}`
console.log(token);
  const response = await customFetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
        'Authorization': token,

    },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  console.log(response.status)
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || "Failed to create checkout session."
    );
  }

  return data;
}
