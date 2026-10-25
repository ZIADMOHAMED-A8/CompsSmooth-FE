"use client";

import { useMutation } from "@tanstack/react-query";
import { resetPasswordAction } from "../otpActions";

export function useResetPassword() {
  const mutation = useMutation({
    // The server action reads the verification token from the HttpOnly NextAuth session.
    mutationFn: ({ email, password }: { email: string; password: string }) => resetPasswordAction(email, password),
    gcTime: 0,
  });
  return mutation;
}
