"use client";

import { useMutation } from "@tanstack/react-query";
import { signupAction } from "../actions/signupAction";
import type { SignupFormValues } from "@/schemas/signupSchema";

export function useSignup() {
  const mutation = useMutation({
    mutationFn: signupAction,
    gcTime: 0,
  });
  return mutation;
}
