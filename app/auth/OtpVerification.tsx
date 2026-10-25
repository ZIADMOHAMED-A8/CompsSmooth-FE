"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { ArrowRight, Clock3, LoaderCircle } from "lucide-react";
import { useVerifyOtp } from "./hooks/useVerifyOtp";

type Purpose = "SIGN_UP" | "PASSWORD_RESET";

function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;
}

export function OtpVerification({
  email,
  purpose,
  expiresAt,
  resendAt,
  onChangeEmail,
  onResend,
  onVerified,
}: {
  email: string;
  purpose: Purpose;
  expiresAt: string;
  resendAt: string;
  onChangeEmail: () => void | Promise<void>;
  onResend: () => Promise<void>;
  onVerified: () => Promise<void>;
}) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [resendRemaining, setResendRemaining] = useState<number | null>(null);
  const [resending, setResending] = useState(false);
  const [changingEmail, setChangingEmail] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const otp = digits.join("");
  const verification = useVerifyOtp(onVerified);
  const busy = verification.isPending;

  useEffect(() => {
    setRemaining(Math.max(0, Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 1000)));
    const timer = window.setInterval(() => {
      setRemaining(Math.max(0, Math.ceil((new Date(expiresAt).getTime() - Date.now()) / 1000)));
      setResendRemaining(Math.max(0, Math.ceil((new Date(resendAt).getTime() - Date.now()) / 1000)));
    }, 1000);
    setResendRemaining(Math.max(0, Math.ceil((new Date(resendAt).getTime() - Date.now()) / 1000)));
    return () => window.clearInterval(timer);
  }, [expiresAt, resendAt]);

  function fillFrom(index: number, value: string) {
    verification.reset();
    setError("");
    const cleaned = value.replace(/\D/g, "").slice(0, 6);
    if (!cleaned) {
      setDigits((current) => current.map((digit, i) => i === index ? "" : digit));
      return;
    }
    const next = [...digits];
    cleaned.split("").forEach((digit, offset) => {
      if (index + offset < 6) next[index + offset] = digit;
    });
    setDigits(next);
    inputRefs.current[Math.min(index + cleaned.length, 5)]?.focus();
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus();
    if (event.key === "ArrowRight" && index < 5) inputRefs.current[index + 1]?.focus();
    if (event.key === "Backspace" && !digits[index] && index > 0) inputRefs.current[index - 1]?.focus();
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy || otp.length !== 6) return;
    try {
      await verification.mutateAsync({ email, purpose, otp });
    } catch {
      // Verification failures are shown from the mutation state below.
    }
  }

  async function resend() {
    if ((resendRemaining ?? 60) > 0 || resending) return;
    setResending(true);
    setError("");
    try {
      await onResend();
      setDigits(["", "", "", "", "", ""]);
      verification.reset();
      inputRefs.current[0]?.focus();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to resend the code.");
    } finally {
      setResending(false);
    }
  }

  async function changeEmail() {
    if (busy || changingEmail) return;
    setChangingEmail(true);
    setError("");
    try {
      await onChangeEmail();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to change email right now.");
    } finally {
      setChangingEmail(false);
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 w-full min-w-0 max-w-full" aria-busy={busy}>
      <p className="break-words text-[12px] leading-5 text-[#65738b]">
        Enter the six-digit verification code sent to <strong className="break-all font-semibold text-[#172033]">{email}</strong>.
      </p>
      <button type="button" onClick={changeEmail} disabled={busy || changingEmail} className="mt-1 text-[11px] font-semibold text-[#c96a00] hover:underline disabled:opacity-50">
        {changingEmail ? "Clearing verification…" : "Change email"}
      </button>

      <fieldset className="mt-5 w-full min-w-0 border-0 p-0">
        <legend className="mb-2 text-[10px] font-bold tracking-[0.08em] text-[#52627d]">VERIFICATION CODE</legend>
        <div className="grid w-full min-w-0 grid-cols-6 gap-1.5 sm:gap-2" role="group" aria-label="Six-digit verification code">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(element) => { inputRefs.current[index] = element; }}
              aria-label={`Digit ${index + 1} of 6`}
              autoFocus={index === 0}
              autoComplete={index === 0 ? "one-time-code" : "off"}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={digit}
              disabled={busy}
              onChange={(event) => fillFrom(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              onPaste={(event) => { event.preventDefault(); fillFrom(index, event.clipboardData.getData("text")); }}
              className="h-12 w-full min-w-0 rounded-[6px] border border-[#d9e0ea] bg-white px-0 text-center text-[18px] font-semibold text-[#172033] outline-none transition focus:border-[#c96a00] focus:ring-2 focus:ring-[#c87512]/10 disabled:bg-[#f8f9fb]"
            />
          ))}
        </div>
      </fieldset>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#65738b]">
        <span className="inline-flex items-center gap-1.5" aria-live="polite"><Clock3 size={14} /> Code expires in <strong className="font-semibold text-[#172033]">{remaining === null ? "15:00" : formatTime(remaining)}</strong></span>
        <button type="button" onClick={resend} disabled={(resendRemaining ?? 60) > 0 || resending || busy} className="font-semibold text-[#c96a00] hover:underline disabled:cursor-not-allowed disabled:text-[#8792a3] disabled:no-underline">
          {resending ? "Sending…" : resendRemaining === null ? "Resend in 01:00" : resendRemaining ? `Resend in ${formatTime(resendRemaining)}` : "Resend code"}
        </button>
      </div>
      {remaining === 0 && <p className="mt-2 text-[11px] text-red-500">This code has expired. Request a new code to continue.</p>}

      {(verification.error || error) && <p role="alert" className="mt-3 text-[11px] text-red-500">{verification.error?.message || error}</p>}

      <button type="submit" disabled={busy || remaining === 0 || otp.length !== 6} className="mt-5 flex h-10 w-full items-center justify-center gap-1.5 rounded-[6px] bg-[#c96a00] text-[13px] font-semibold text-white transition hover:bg-[#b75f00] active:scale-[0.995] disabled:cursor-not-allowed disabled:opacity-60">
        {busy ? <><LoaderCircle size={16} className="animate-spin" /> Verifying…</> : <>Verify email <ArrowRight size={17} strokeWidth={2.3} /></>}
      </button>
    </form>
  );
}
