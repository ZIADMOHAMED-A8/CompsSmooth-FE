"use server";
import { auth } from "../auth";
import {
    GetRecentCompsParams,
    RecentCompsResponse,
} from "../types/recentComps.types";

export async function getRecentCompsAction({
    page = 1,
    limit = 20,
}: GetRecentCompsParams = {}): Promise<RecentCompsResponse> {
    const session = await auth()
    const token = `Bearer ${session?.accessToken}`
    const searchParams = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    });

    const apiUrl = `${process.env.BACK_END_URL}/api/properties?${searchParams.toString()}`;

    const response = await fetch(apiUrl, {
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
            data?.message || "Failed to fetch recent comps."
        );
    }

    return data;
}