"use server";

import { auth } from "@/app/auth";
import { customFetch } from "@/app/helpers/customFetch";

import type {
  ProfileResponse,
  UpdateProfilePayload,
} from "../types/profile.types";

const profilePath = "/api/users/profile";

function getProfileUrl() {
  return `${process.env.BACK_END_URL}${profilePath}`;
}

async function getAuthorizationHeader() {
  const session = await auth();

  if (!session?.accessToken) {
    throw new Error("Authentication token is required");
  }

  return `Bearer ${session.accessToken}`;
}

async function getErrorMessage(response: Response) {
  const data = await response.json().catch(() => null);

  return data?.message || "Something went wrong. Please try again.";
}

export async function getProfileAction(): Promise<ProfileResponse> {
  const response = await customFetch(getProfileUrl(), {
    method: "GET",
    headers: {
      Authorization: await getAuthorizationHeader(),
    },
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return response.json();
}

export async function updateProfileAction(
  payload: UpdateProfilePayload
): Promise<ProfileResponse> {
  const cleanPayload = {
    ...(payload.name?.trim() ? { name: payload.name.trim() } : {}),
    ...(payload.email?.trim()
      ? { email: payload.email.trim().toLowerCase() }
      : {}),
  };

  if (Object.keys(cleanPayload).length === 0) {
    throw new Error("At least one profile field is required.");
  }

  const response = await customFetch(getProfileUrl(), {
    method: "PATCH",
    headers: {
      Authorization: await getAuthorizationHeader(),
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(cleanPayload),
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  return response.json();
}
