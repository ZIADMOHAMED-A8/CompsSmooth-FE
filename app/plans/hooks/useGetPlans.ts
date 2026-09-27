"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlansAction } from "../actions/getPlansAction";

export function usePlans() {
  return useQuery({
    queryKey: ["plans"],
    queryFn: getPlansAction,
  });
}