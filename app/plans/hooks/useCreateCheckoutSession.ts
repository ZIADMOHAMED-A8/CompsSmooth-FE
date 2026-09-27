"use client";

import { useMutation } from "@tanstack/react-query";

import { createCheckoutSessionAction } from "../actions/createCheckoutSessionAction";

export function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: createCheckoutSessionAction,
  });
}