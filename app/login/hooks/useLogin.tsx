"use client";

import { useMutation } from "@tanstack/react-query";
import { loginAction } from '../actions/loginAction';
import { signIn } from "@/app/auth";
export function useLogin() {
  return useMutation({
    mutationFn: loginAction,
    })
  };
