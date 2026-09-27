"use server";

import { Session } from "inspector/promises";
import {
  CreateCheckoutSessionPayload,
  CreateCheckoutSessionResponse,
} from "../types/plan.types";
import { auth } from "@/app/auth";

const apiUrl = `${process.env.BACK_END_URL}/api/users/create-checkout-session`;
export async function createCheckoutSessionAction(
  payload: CreateCheckoutSessionPayload
): Promise<CreateCheckoutSessionResponse> {
const session = await auth();
const token=`Bearer ${session.accessToken}`
console.log(token);
  const response = await fetch(apiUrl, {
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