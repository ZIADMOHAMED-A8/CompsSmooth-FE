"use server";

import { auth } from "@/app/auth";
import { Plan } from "../types/plan.types";

const apiUrl = `${process.env.BACK_END_URL}/api/users/plan`;

export async function getCurrentPlan(): Promise<Plan[]> {
    const session = await auth();
     if(!session?.accessToken){
        throw new Error('please log in ')
     }
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
            data?.message || "Failed to fetch your current plan."
        );
    }

    return data;
}