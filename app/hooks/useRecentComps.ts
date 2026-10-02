"use client";

import { useQuery } from "@tanstack/react-query";

import { getRecentCompsAction } from "../actions/getRecentCompsAction";

export function useRecentComps(
  page = 1,
  limit = 20
) {
  return useQuery({
    queryKey: ["recent-comps", page, limit],

    queryFn: () =>
      getRecentCompsAction({
        page,
        limit,
      }),

    placeholderData: (previousData) => previousData,
  });
}