"use server";

import { auth } from "../auth";
import type {
  RunCompsRequest,
  RunCompsResponse,
} from "../types/runComps.types";
import { customFetch } from "../helpers/customFetch";

export async function runCompsAction(
  payload: RunCompsRequest
): Promise<RunCompsResponse> {
  const apiUrl = `${process.env.BACK_END_URL}/api/property`;
  const session = await auth()
  const token = `Bearer ${session?.accessToken}`
  const response = await customFetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': token,
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || "Failed to run comps."
    );
  }

  return data.data;
}
