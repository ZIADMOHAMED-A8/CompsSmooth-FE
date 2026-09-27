"use server";

import { auth } from "@/app/auth";
import { Plan } from "../types/plan.types";

const apiUrl = `${process.env.BACK_END_URL}/api/plans`;

export async function getPlansAction(): Promise<Plan[]> {
  const session = await auth();
  console.log(session)
    const token = `Bearer ${session?.accessToken}`
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
        'Authorization': token,
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.message || "Failed to fetch plans."
    );
  }

  return data;
}