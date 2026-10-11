"use client";

import { useQuery } from "@tanstack/react-query";

import { getUsageAction } from "../actions/getUsageAction";

export function useUsage() {
  return useQuery({
    queryKey: ["usage"],
    queryFn: getUsageAction,
  });
}