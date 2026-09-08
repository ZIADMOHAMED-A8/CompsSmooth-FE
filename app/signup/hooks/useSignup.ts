"use client";

import { useMutation } from "@tanstack/react-query";
import { signupAction } from "../actions/signupAction";

export function useSignup() {
  return useMutation({
    mutationFn: signupAction,
  });
}