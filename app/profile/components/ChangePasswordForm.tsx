"use client";

import { useEffect, useState, type FormEvent } from "react";
import { signOut } from "next-auth/react";
import { Eye, EyeOff, KeyRound, Loader2 } from "lucide-react";
import { passwordSchema } from "@/schemas/passwordSchema";
import { useChangePassword } from "../hooks/useChangePassword";

type PasswordField = "currentPassword" | "newPassword" | "confirmPassword";
const labels: Record<PasswordField, string> = {
  currentPassword: "Current password",
  newPassword: "New password",
  confirmPassword: "Confirm new password",
};

export function ChangePasswordForm() {
  const [values, setValues] = useState<Record<PasswordField, string>>({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [visible, setVisible] = useState<Record<PasswordField, boolean>>({ currentPassword: false, newPassword: false, confirmPassword: false });
  const [errors, setErrors] = useState<Partial<Record<PasswordField, string>>>({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const changePassword = useChangePassword();
  const busy = changePassword.isPending;

  useEffect(() => {
    if (!success) return;
    const timer = window.setTimeout(() => {
      void signOut({ redirectTo: "/login" });
    }, 1800);
    return () => window.clearTimeout(timer);
  }, [success]);

  function validate() {
    const next: Partial<Record<PasswordField, string>> = {};
    if (!values.currentPassword) next.currentPassword = "Enter your current password.";
    const result = passwordSchema.safeParse(values.newPassword);
    if (!result.success) next.newPassword = result.error.issues[0]?.message || "Enter a valid password.";
    if (values.confirmPassword !== values.newPassword) next.confirmPassword = "Passwords do not match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError("");
    if (busy || !validate()) return;
    try {
      await changePassword.mutateAsync({ currentPassword: values.currentPassword, newPassword: values.newPassword });
      setValues({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setErrors({});
      setSuccess(true);
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Unable to change your password. Please try again.";
      if (/current password is incorrect/i.test(message)) setErrors((current) => ({ ...current, currentPassword: message }));
      else if (/new password|password must|lowercase|uppercase|special symbol|at least 8/i.test(message)) setErrors((current) => ({ ...current, newPassword: message }));
      else setServerError(message);
    }
  }

  function update(field: PasswordField, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setServerError("");
    changePassword.reset();
  }

  if (success) return <div role="status" aria-live="polite" className="p-5 sm:p-6">
    <p className="rounded-[6px] border border-[#cfe9d8] bg-[#f0fbf4] px-4 py-3 text-[12px] leading-5 text-[#178848]">Password changed successfully. Your other sessions have been signed out. Signing you out now…</p>
    <button type="button" onClick={() => void signOut({ redirectTo: "/login" })} className="mt-4 rounded-[6px] bg-[#c96a00] px-4 py-2.5 text-[12px] font-semibold text-white hover:bg-[#b75f00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c96a00]">Sign in again</button>
  </div>;

  const valid = Boolean(values.currentPassword) && passwordSchema.safeParse(values.newPassword).success && Boolean(values.confirmPassword) && values.confirmPassword === values.newPassword;
  return <form onSubmit={submit} noValidate className="p-4 sm:p-5" aria-busy={busy}>
    <div className="mb-4 rounded-[6px] border border-[#e5eaf0] bg-[#f8fafc] px-3 py-2.5 text-[11px] leading-5 text-[#65738b]" aria-live="polite">
      Changing your password signs you out of other sessions. You’ll need to sign in again here.
    </div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {(["currentPassword", "newPassword", "confirmPassword"] as PasswordField[]).map((field) => (
        <div key={field} className={field === "currentPassword" ? "md:col-span-2" : ""}>
          <label htmlFor={field} className="mb-1.5 block text-[11px] font-semibold text-[#52627d]">{labels[field]}</label>
          <div className="relative">
            <KeyRound size={16} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#697b98]" />
            <input id={field} name={field} type={visible[field] ? "text" : "password"} autoComplete={field === "currentPassword" ? "current-password" : "new-password"} value={values[field]} onChange={(event) => update(field, event.target.value)} disabled={busy} aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `${field}-error` : field === "newPassword" ? "newPassword-requirements" : undefined} className={`h-11 w-full rounded-[6px] border bg-white pl-10 pr-12 text-[13px] text-[#172033] outline-none transition focus:ring-2 focus:ring-[#c87512]/10 disabled:bg-[#f7f8fa] ${errors[field] ? "border-red-400 focus:border-red-400" : "border-[#d9e0ea] focus:border-[#c87512]"}`} />
            <button type="button" onClick={() => setVisible((current) => ({ ...current, [field]: !current[field] }))} aria-label={`${visible[field] ? "Hide" : "Show"} ${labels[field].toLowerCase()}`} aria-pressed={visible[field]} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-[#697b98] hover:text-[#263241] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c96a00]">
              {visible[field] ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
          {field === "newPassword" && <p id="newPassword-requirements" className="mt-1.5 text-[10px] leading-4 text-[#687994]">At least 8 characters, with an uppercase letter, a lowercase letter, and a special symbol.</p>}
          {errors[field] && <p id={`${field}-error`} role="alert" aria-live="polite" className="mt-1.5 text-[10px] text-red-600">{errors[field]}</p>}
        </div>
      ))}
    </div>
    {serverError && <p role="alert" aria-live="polite" className="mt-4 rounded-[4px] border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-600">{serverError}</p>}
    <div className="mt-5 flex justify-end">
      <button type="submit" disabled={busy || !valid} className="flex h-10 w-full items-center justify-center gap-2 rounded-[6px] bg-[#c96a00] px-4 text-[12px] font-semibold text-white transition hover:bg-[#b75f00] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c96a00] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
        {busy ? <><Loader2 size={15} className="animate-spin" /> Changing password…</> : "Change password"}
      </button>
    </div>
  </form>;
}
