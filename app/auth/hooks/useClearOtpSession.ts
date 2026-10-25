"use client";

import { useMutation } from "@tanstack/react-query";
import { clearOtpSessionAction } from "../otpActions";

export function useClearOtpSession() {
  return useMutation({
    mutationFn: clearOtpSessionAction,
    gcTime: 0,
  });
}
