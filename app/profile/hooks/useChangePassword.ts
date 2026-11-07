"use client";

import { useMutation } from "@tanstack/react-query";
import { changePasswordAction } from "../actions/changePasswordAction";

export function useChangePassword() {
  return useMutation({
    mutationFn: changePasswordAction,
    gcTime: 0,
  });
}
