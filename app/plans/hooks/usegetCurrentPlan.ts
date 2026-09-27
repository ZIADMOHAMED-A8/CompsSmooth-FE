"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentPlan } from "../actions/getCurrentPlan";

export function useGetCurrentPlan() {
  return useQuery({
    queryKey: ["currentPlan"],
    queryFn: getCurrentPlan,
     retry: false,
  });
}