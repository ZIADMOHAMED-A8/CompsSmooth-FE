"use client";

import { useMutation } from "@tanstack/react-query";
import { runCompsAction } from "../actions/searchAddressAction";

export function useSearchAddress() {
  return useMutation({
    mutationFn: runCompsAction,
  });
}