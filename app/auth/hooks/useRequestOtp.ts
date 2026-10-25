"use client";

import { useMutation } from "@tanstack/react-query";
import { requestOtpAction } from "../otpActions";

export function useRequestOtp() {
  return useMutation({
    mutationFn: ({ email, purpose }: { email: string; purpose: "SIGN_UP" | "PASSWORD_RESET" }) =>
      requestOtpAction(email, purpose),
  });
}
