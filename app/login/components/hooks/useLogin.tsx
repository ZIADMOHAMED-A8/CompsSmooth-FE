"use client";

import { useMutation } from "@tanstack/react-query";
import { loginAction } from '../actions/loginAction';

export function useLogin() {
  return useMutation({
    mutationFn: loginAction,
  });
}