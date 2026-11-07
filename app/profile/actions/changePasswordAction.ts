"use server";

import { auth } from "@/app/auth";
import { customFetch } from "@/app/helpers/customFetch";
import type { ChangePasswordPayload, ChangePasswordResponse } from "../types/profile.types";

export async function changePasswordAction(payload: ChangePasswordPayload): Promise<ChangePasswordResponse> {
  const session = await auth();
  if (!session?.accessToken) throw new Error("Your session has expired. Please sign in again.");

  const response = await customFetch(`${process.env.BACK_END_URL}/api/users/change-password`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.message || "Unable to change your password. Please try again.");
  return data as ChangePasswordResponse;
}
