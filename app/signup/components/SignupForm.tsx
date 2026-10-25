"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, AtSign, Eye, EyeOff, LockKeyhole, User } from "lucide-react";
import { signupSchema, type SignupFormValues } from "@/schemas/signupSchema";
import { useClearOtpSession } from "@/app/auth/hooks/useClearOtpSession";
import { useOtpSession } from "@/app/auth/hooks/useOtpSession";
import { useRequestOtp } from "@/app/auth/hooks/useRequestOtp";
import { OtpVerification } from "@/app/auth/OtpVerification";
import { useSignup } from "../hooks/useSignup";

type SignupOtpFlow = { email: string; purpose: "SIGN_UP"; expiresAt: string; resendAt: string; verified: boolean };

export function SignupForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [flow, setFlow] = useState<SignupOtpFlow | null>(null);
  const [pendingData, setPendingData] = useState<SignupFormValues | null>(null);
  const request = useRequestOtp();
  const clearSession = useClearOtpSession();
  const signup = useSignup();
  const session = useOtpSession("SIGN_UP");
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  useEffect(() => {
    if (!session.isPending && session.data) {
      setFlow({ ...session.data, purpose: "SIGN_UP" });
      setValue("email", session.data.email);
    }
  }, [session.data, session.isPending, setValue]);

  async function clearFlow() {
    await clearSession.mutateAsync();
    setFlow(null);
    setPendingData(null);
    request.reset();
    signup.reset();
    await session.refetch();
    router.refresh();
  }

  async function finishSignup(data: SignupFormValues) {
    await signup.mutateAsync(data);
    setFlow(null);
    setPendingData(null);
  }

  async function submitSignup(data: SignupFormValues) {
    request.reset();
    signup.reset();
    if (flow?.verified) {
      try {
        await finishSignup(data);
      } catch {
        // Keep the verified flow so the user can correct the form or retry.
      }
      return;
    }

    try {
      const response = await request.mutateAsync({ email: data.email, purpose: "SIGN_UP" });
      setPendingData(data);
      setFlow({ email: data.email, purpose: "SIGN_UP", ...response.data, verified: false });
    } catch {
      // The mutation error is displayed with the form.
    }
  }

  async function onVerified() {
    const result = await session.refetch();
    if (!result.data) return;
    setFlow({ ...result.data, purpose: "SIGN_UP" });
    if (pendingData) {
      try {
        await finishSignup(pendingData);
      } catch {
        // Signup errors are shown on the form after the flow switches to verified.
      }
    }
  }

  if (session.isPending && !flow) {
    return <p className="mt-6 text-center text-[12px] text-[#65738b]">Checking verification status…</p>;
  }

  if (flow && !flow.verified) {
    return <OtpVerification
      email={flow.email}
      purpose="SIGN_UP"
      expiresAt={flow.expiresAt}
      resendAt={flow.resendAt}
      onChangeEmail={clearFlow}
      onResend={async () => {
        const response = await request.mutateAsync({ email: flow.email, purpose: "SIGN_UP" });
        setFlow({ ...flow, ...response.data });
      }}
      onVerified={onVerified}
    />;
  }

  const isPending = request.isPending || signup.isPending;
  return (
    <form onSubmit={handleSubmit(submitSignup)} className="mt-6">
      <div>
        <label htmlFor="name" className="mb-1.5 block text-[10px] font-bold tracking-[0.08em] text-[#52627d]">FULL NAME</label>
        <div className="relative"><User size={17} strokeWidth={1.8} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#697b98]" />
          <input id="name" type="text" placeholder="Your full name" autoComplete="name" disabled={isPending} {...register("name")} className={`h-[46px] w-full rounded-[6px] border bg-white pl-12 pr-3 text-[13px] text-[#172033] outline-none transition placeholder:text-[#333d50] focus:ring-2 focus:ring-[#c87512]/10 ${errors.name ? "border-red-400 focus:border-red-400" : "border-[#d9e0ea] focus:border-[#c87512]"}`} />
        </div>{errors.name && <p className="mt-1.5 text-[10px] text-red-500">{errors.name.message}</p>}
      </div>
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <label htmlFor="email" className="text-[10px] font-bold tracking-[0.08em] text-[#52627d]">INSTITUTIONAL EMAIL</label>
          {flow?.verified ? <button type="button" onClick={clearFlow} className="text-[10px] font-semibold text-[#c96a00] hover:underline">Change email</button> : <span className="text-[10px] text-[#687994]">SSO / SAML Enabled</span>}
        </div>
        <div className="relative"><AtSign size={17} strokeWidth={1.8} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#697b98]" />
          <input id="email" type="email" placeholder="name@work-email.com" autoComplete="email" disabled={isPending || !!flow?.verified} {...register("email")} className={`h-[46px] w-full rounded-[6px] border bg-white pl-12 pr-3 text-[13px] text-[#172033] outline-none transition placeholder:text-[#333d50] focus:ring-2 focus:ring-[#c87512]/10 disabled:bg-[#f8f9fb] ${errors.email ? "border-red-400 focus:border-red-400" : "border-[#d9e0ea] focus:border-[#c87512]"}`} />
        </div>{errors.email && <p className="mt-1.5 text-[10px] text-red-500">{errors.email.message}</p>}
      </div>
      <div className="mt-4">
        <label htmlFor="password" className="mb-1.5 block text-[10px] font-bold tracking-[0.08em] text-[#52627d]">TERMINAL PASSKEY</label>
        <div className="relative"><LockKeyhole size={17} strokeWidth={1.8} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#697b98]" />
          <input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••••••" autoComplete="new-password" disabled={isPending} {...register("password")} className={`h-[46px] w-full rounded-[6px] border bg-white pl-12 pr-11 text-[13px] text-[#172033] outline-none transition placeholder:text-[#172033] focus:ring-2 focus:ring-[#c87512]/10 ${errors.password ? "border-red-400 focus:border-red-400" : "border-[#d9e0ea] focus:border-[#c87512]"}`} />
          <button type="button" onClick={() => setShowPassword((value) => !value)} disabled={isPending} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#697b98] transition hover:text-[#172033]">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>
        </div>{errors.password && <p className="mt-1.5 text-[10px] text-red-500">{errors.password.message}</p>}
      </div>
      {(request.error || signup.error) && <p role="alert" className="mt-3 text-[11px] text-red-500">{request.error?.message || signup.error?.message}</p>}
      <button type="submit" disabled={isPending} className="mt-5 flex h-10 w-full items-center justify-center gap-1.5 rounded-[6px] bg-[#c96a00] text-[13px] font-semibold text-white transition hover:bg-[#b75f00] active:scale-[0.995] disabled:cursor-not-allowed disabled:opacity-60">
        {isPending ? "Processing…" : flow?.verified ? <>Create Account <ArrowRight size={17} strokeWidth={2.3} /></> : <>Continue to email verification <ArrowRight size={17} strokeWidth={2.3} /></>}
      </button>
    </form>
  );
}
