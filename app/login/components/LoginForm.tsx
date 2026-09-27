"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRight,
  AtSign,
  Eye,
  EyeOff,
  LockKeyhole,
} from "lucide-react";

import {
  loginSchema,
  type LoginFormValues,
} from "@/schemas/loginSchema";
import { useLogin } from "../hooks/useLogin";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginFormValues) {
    console.log('tryna submit')
    login.mutate(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      {/* EMAIL */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label
            htmlFor="email"
            className="text-[10px] font-bold tracking-[0.08em] text-[#52627d]"
          >
            INSTITUTIONAL EMAIL
          </label>

          <span className="text-[10px] text-[#687994]">
            SSO / SAML Enabled
          </span>
        </div>

        <div className="relative">
          <AtSign
            size={17}
            strokeWidth={1.8}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#697b98]"
          />

          <input
            id="email"
            type="email"
            placeholder="name@work-email.com"
            autoComplete="email"
            disabled={login.isPending}
            {...register("email")}
            className={`
              h-[46px] w-full rounded-[6px]
              border bg-white
              pl-12 pr-3
              text-[13px] text-[#172033]
              outline-none
              transition
              placeholder:text-[#333d50]
              focus:ring-2 focus:ring-[#c87512]/10
              ${
                errors.email
                  ? "border-red-400 focus:border-red-400"
                  : "border-[#d9e0ea] focus:border-[#c87512]"
              }
            `}
          />
        </div>

        {errors.email && (
          <p className="mt-1.5 text-[10px] text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* PASSWORD */}
      <div className="mt-4">
        <label
          htmlFor="password"
          className="mb-1.5 block text-[10px] font-bold tracking-[0.08em] text-[#52627d]"
        >
          TERMINAL PASSKEY
        </label>

        <div className="relative">
          <LockKeyhole
            size={17}
            strokeWidth={1.8}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#697b98]"
          />

          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••••••"
            autoComplete="current-password"
            disabled={login.isPending}
            {...register("password")}
            className={`
              h-[46px] w-full rounded-[6px]
              border bg-white
              pl-12 pr-11
              text-[13px] text-[#172033]
              outline-none
              transition
              placeholder:text-[#172033]
              focus:ring-2 focus:ring-[#c87512]/10
              ${
                errors.password
                  ? "border-red-400 focus:border-red-400"
                  : "border-[#d9e0ea] focus:border-[#c87512]"
              }
            `}
          />

          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            disabled={login.isPending}
            aria-label={
              showPassword ? "Hide password" : "Show password"
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#697b98] transition hover:text-[#172033] disabled:opacity-50"
          >
            {showPassword ? (
              <EyeOff size={17} />
            ) : (
              <Eye size={17} />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="mt-1.5 text-[10px] text-red-500">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* REMEMBER + FORGOT PASSWORD */}
      <div className="mt-4 flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-1.5 text-[11px] text-[#61718b]">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            disabled={login.isPending}
            className="h-4 w-4 accent-[#c96a00]"
          />

          Remember this device
        </label>

        <button
          type="button"
          className="text-[11px] font-medium text-[#c96a00] hover:underline"
        >
          Forgot password?
        </button>
      </div>

      {/* SERVER ERROR */}
      {login.isError && (
        <p className="mt-3 text-[11px] text-red-500">
          {login.error.message}
        </p>
      )}

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={login.isPending}
        className="
          mt-5 flex h-10 w-full
          items-center justify-center gap-1.5
          rounded-[6px]
          bg-[#c96a00]
          text-[13px] font-semibold text-white
          transition
          hover:bg-[#b75f00]
          active:scale-[0.995]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {login.isPending ? (
          "Signing In..."
        ) : (
          <>
            Sign In
            <ArrowRight size={17} strokeWidth={2.3} />
          </>
        )}
      </button>
    </form>
  );
}