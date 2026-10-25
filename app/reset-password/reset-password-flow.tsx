"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, AtSign, Eye, EyeOff, LockKeyhole } from "lucide-react";
import { passwordSchema } from "@/schemas/passwordSchema";
import { OtpVerification } from "@/app/auth/OtpVerification";
import { useClearOtpSession } from "@/app/auth/hooks/useClearOtpSession";
import { useOtpSession } from "@/app/auth/hooks/useOtpSession";
import { useRequestOtp } from "@/app/auth/hooks/useRequestOtp";
import { useResetPassword } from "@/app/auth/hooks/useResetPassword";

type Step = "email" | "otp" | "password" | "complete";

export function ResetPasswordFlow() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<Step>("email");
  const [expiresAt, setExpiresAt] = useState("");
  const [resendAt, setResendAt] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const request = useRequestOtp();
  const clearSession = useClearOtpSession();
  const resetPassword = useResetPassword();
  const session = useOtpSession("PASSWORD_RESET");

  useEffect(() => {
    const flow = session.data;
    if (!flow) return;
    setEmail(flow.email);
    setExpiresAt(flow.expiresAt);
    setResendAt(flow.resendAt);
    setStep(flow.verified ? "password" : "otp");
  }, [session.data]);

  async function clearFlow() {
    await clearSession.mutateAsync();
    setStep("email");
    setExpiresAt("");
    setResendAt("");
    setEmail("");
    await session.refetch();
    router.refresh();
  }

  async function sendCode(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true); setError("");
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const response = await request.mutateAsync({ email: normalizedEmail, purpose: "PASSWORD_RESET" });
      setEmail(normalizedEmail);
      setExpiresAt(response.data.expiresAt);
      setResendAt(response.data.resendAt);
      setStep("otp");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to send a verification code.");
    } finally { setBusy(false); }
  }

  async function finishReset(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) { setError(passwordResult.error.issues[0]?.message || "Enter a valid password."); return; }
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }
    setBusy(true); setError("");
    try {
      await resetPassword.mutateAsync({ email, password });
      setExpiresAt("");
      setStep("complete");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to reset your password.");
    } finally { setBusy(false); }
  }

  if (session.isPending && step === "email") return <p className="mt-6 text-center text-[12px] text-[#65738b]">Checking verification status…</p>;

  if (step === "otp") return <OtpVerification
    email={email}
    purpose="PASSWORD_RESET"
    expiresAt={expiresAt}
    resendAt={resendAt}
    onChangeEmail={clearFlow}
    onResend={async () => {
      const response = await request.mutateAsync({ email, purpose: "PASSWORD_RESET" });
      setExpiresAt(response.data.expiresAt);
      setResendAt(response.data.resendAt);
    }}
    onVerified={async () => {
      const result = await session.refetch();
      if (result.data?.verified) setStep("password");
    }}
  />;

  if (step === "password") return <form onSubmit={finishReset} className="mt-6">
    <p className="text-[12px] text-[#65738b]">Choose a new passkey for <strong className="font-semibold text-[#172033]">{email}</strong>.</p>
    <div className="mt-4">
      <label htmlFor="new-password" className="mb-1.5 block text-[10px] font-bold tracking-[0.08em] text-[#52627d]">NEW PASSKEY</label>
      <div className="relative"><LockKeyhole size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#697b98]" />
        <input id="new-password" type={showPassword ? "text" : "password"} autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} disabled={busy} className="h-[46px] w-full rounded-[6px] border border-[#d9e0ea] bg-white pl-12 pr-11 text-[13px] text-[#172033] outline-none transition focus:border-[#c96a00] focus:ring-2 focus:ring-[#c87512]/10" />
        <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#697b98]">{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button>
      </div>
    </div>
    <div className="mt-4"><label htmlFor="confirm-password" className="mb-1.5 block text-[10px] font-bold tracking-[0.08em] text-[#52627d]">CONFIRM PASSKEY</label>
      <input id="confirm-password" type={showPassword ? "text" : "password"} autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} disabled={busy} className="h-[46px] w-full rounded-[6px] border border-[#d9e0ea] bg-white px-3 text-[13px] text-[#172033] outline-none transition focus:border-[#c96a00] focus:ring-2 focus:ring-[#c87512]/10" />
    </div>
    <p className="mt-2 text-[10px] text-[#687994]">At least 8 characters, including uppercase, lowercase, and a symbol.</p>
    {(error || resetPassword.error) && <p role="alert" className="mt-3 text-[11px] text-red-500">{error || resetPassword.error?.message}</p>}
    <button type="submit" disabled={busy} className="mt-5 flex h-10 w-full items-center justify-center gap-1.5 rounded-[6px] bg-[#c96a00] text-[13px] font-semibold text-white transition hover:bg-[#b75f00] disabled:cursor-not-allowed disabled:opacity-60">{busy ? "Updating passkey…" : <>Reset password <ArrowRight size={17} /></>}</button>
  </form>;

  if (step === "complete") return <div className="mt-6 text-center" role="status"><p className="text-[13px] font-semibold text-[#172033]">Your passkey has been updated.</p><Link href="/login" className="mt-4 inline-flex h-10 items-center justify-center rounded-[6px] bg-[#c96a00] px-5 text-[13px] font-semibold text-white hover:bg-[#b75f00]">Return to sign in</Link></div>;

  return <form onSubmit={sendCode} className="mt-6">
    <p className="text-[12px] text-[#65738b]">Enter your account email and we’ll send you a password reset code.</p>
    <div className="mt-4"><label htmlFor="reset-email" className="mb-1.5 block text-[10px] font-bold tracking-[0.08em] text-[#52627d]">INSTITUTIONAL EMAIL</label>
      <div className="relative"><AtSign size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#697b98]" /><input id="reset-email" type="email" required autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} disabled={busy} placeholder="name@work-email.com" className="h-[46px] w-full rounded-[6px] border border-[#d9e0ea] bg-white pl-12 pr-3 text-[13px] text-[#172033] outline-none transition placeholder:text-[#333d50] focus:border-[#c96a00] focus:ring-2 focus:ring-[#c87512]/10" /></div>
    </div>
    {(error || request.error) && <p role="alert" className="mt-3 text-[11px] text-red-500">{error || request.error?.message}</p>}
    <button type="submit" disabled={busy || !email.trim()} className="mt-5 flex h-10 w-full items-center justify-center gap-1.5 rounded-[6px] bg-[#c96a00] text-[13px] font-semibold text-white transition hover:bg-[#b75f00] disabled:cursor-not-allowed disabled:opacity-60">{busy ? "Sending code…" : <>Send reset code <ArrowRight size={17} /></>}</button>
    <Link href="/login" className="mt-4 block text-center text-[11px] font-semibold text-[#c96a00] hover:underline">Back to sign in</Link>
  </form>;
}
