"use server";

import { auth } from "../auth";
import {
  RunCompsFormValues,
} from "../schemas/runCompsSchema";

import {
  RunCompsResult,
} from "../types/runComps.types";

export async function runCompsAction(
  payload: RunCompsFormValues
): Promise<RunCompsResult> {
  const apiUrl = `${process.env.BACK_END_URL}/api/property`;
  const session = await auth()
  const token = `Bearer ${session?.accessToken}`
  const response = await fetch(apiUrl, {
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