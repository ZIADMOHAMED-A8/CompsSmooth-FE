"use server";

import { auth } from "@/app/auth";
import { UsageResponse } from "../types/usage.types";
import { customFetch } from "@/app/helpers/customFetch";

export async function getUsageAction(): Promise<UsageResponse> {
    const session = await auth()
    const token = `Bearer ${session?.accessToken}`
    const apiUrl = `${process.env.BACK_END_URL}/api/users/plan`;
    console.log(apiUrl,'usage url')

    const response = await customFetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            'Authorization': token,

        },
        credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data?.message || "Failed to fetch usage data."
        );
    }

    return data;
}
