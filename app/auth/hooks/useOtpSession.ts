"use client";

import { useQuery } from "@tanstack/react-query";
import { getOtpSessionAction } from "../otpActions";
import type { OtpPurpose } from "@/app/otpAuth";

export function useOtpSession(purpose: OtpPurpose) {
  return useQuery({
    queryKey: ["otp-flow-session", purpose],
    queryFn: () => getOtpSessionAction(purpose),
    staleTime: 0,
    refetchOnWindowFocus: false,
  });
}
