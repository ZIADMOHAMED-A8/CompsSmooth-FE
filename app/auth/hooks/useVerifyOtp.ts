"use client";

import { useMutation } from "@tanstack/react-query";
import { verifyOtpAction } from "../otpActions";

type OtpPurpose = "SIGN_UP" | "PASSWORD_RESET";

export function useVerifyOtp(onVerified: () => Promise<void>) {
  return useMutation({
    // The action stores the token in NextAuth's encrypted HttpOnly session.
    mutationFn: async ({ email, purpose, otp }: { email: string; purpose: OtpPurpose; otp: string }) => {
      await verifyOtpAction(email, purpose, otp);
      await onVerified();
    },
    gcTime: 0,
  });
}
