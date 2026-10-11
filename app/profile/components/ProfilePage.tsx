"use client";

import { useEffect, useMemo, useState } from "react";
import type { InputHTMLAttributes } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AtSign,
  BadgeCheck,
  CalendarDays,
  IdCard,
  Loader2,
  RotateCcw,
  Save,
  Shield,
  User,
  type LucideIcon,
} from "lucide-react";
import { useForm } from "react-hook-form";

import {
  profileSchema,
  type ProfileFormValues,
} from "@/schemas/profileSchema";

import { useProfile, useUpdateProfile } from "../hooks/useProfile";
import { ProfileSkeleton } from "./ProfileSkeleton";

export function ProfilePage() {
  const { data, isLoading, isError, error } = useProfile();
  const updateProfile = useUpdateProfile();
  const [successMessage, setSuccessMessage] = useState("");

  const user = data?.data.user;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (!user) return;

    reset({
      name: user.name,
      email: user.email,
    });
  }, [reset, user]);

  const initials = useMemo(() => {
    if (!user?.name) return "U";

    return user.name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  }, [user?.name]);

  function onSubmit(values: ProfileFormValues) {
    setSuccessMessage("");

    updateProfile.mutate(values, {
      onSuccess: (response) => {
        setSuccessMessage(
          response.message || "Profile updated successfully."
        );
      },
    });
  }

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  if (isError || !user) {
    return (
      <div className="rounded-[4px] border border-[#e2e6ea] bg-white px-4 py-8 text-center">
        <p className="text-[10px] text-red-500">
          {error instanceof Error
            ? error.message
            : "Failed to load profile."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
      <section className="rounded-[4px] border border-[#dce2e8] bg-white">
        <div className="border-b border-[#e6e9ed] px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#e0e6ed] bg-[#f4f7f9] text-[20px] font-semibold text-[#c96a00]">
              {initials}
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-[15px] font-semibold text-[#18212f]">
                {user.name}
              </h2>

              <p className="mt-1 truncate text-[9px] text-[#9099a6]">
                {user.email}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2 p-4">
          <ProfileFact
            icon={Shield}
            label="Role"
            value={user.role}
          />
          <ProfileFact
            icon={CalendarDays}
            label="Joined"
            value={formatDate(user.createdAt)}
          />
          <ProfileFact
            icon={BadgeCheck}
            label="Last Updated"
            value={formatDate(user.updatedAt)}
          />
          <ProfileFact
            icon={IdCard}
            label="User ID"
            value={user.id}
          />
        </div>
      </section>

      <section className="rounded-[4px] border border-[#dce2e8] bg-white">
        <div className="flex items-center justify-between border-b border-[#e6e9ed] px-4 py-3">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#d97706]">
              Account Settings
            </p>

            <h2 className="mt-1 text-[12px] font-semibold text-[#263241]">
              Profile Information
            </h2>
          </div>

          <span className="rounded-full bg-[#f3f6f8] px-2 py-1 text-[7px] font-medium uppercase text-[#687382]">
            {user.role}
          </span>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-4"
        >
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <ProfileInput
              id="name"
              label="Full Name"
              icon={User}
              error={errors.name?.message}
              disabled={updateProfile.isPending}
              {...register("name")}
            />

            <ProfileInput
              id="email"
              label="Email Address"
              type="email"
              icon={AtSign}
              error={errors.email?.message}
              disabled={updateProfile.isPending}
              {...register("email")}
            />
          </div>

          {errors.root?.message && (
            <p className="mt-3 text-[10px] text-red-500">
              {errors.root.message}
            </p>
          )}

          {updateProfile.isError && (
            <p className="mt-3 rounded-[4px] border border-red-200 bg-red-50 px-3 py-2 text-[10px] text-red-600">
              {updateProfile.error.message}
            </p>
          )}

          {successMessage && !updateProfile.isError && (
            <p className="mt-3 rounded-[4px] border border-[#cfe9d8] bg-[#f0fbf4] px-3 py-2 text-[10px] text-[#178848]">
              {successMessage}
            </p>
          )}

          <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => {
                reset({
                  name: user.name,
                  email: user.email,
                });
                setSuccessMessage("");
              }}
              disabled={updateProfile.isPending || !isDirty}
              className="flex h-10 items-center justify-center gap-1.5 rounded-[6px] border border-[#d9e0ea] bg-white px-4 text-[12px] font-semibold text-[#52627d] transition hover:bg-[#f7f8fa] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw size={15} />
              Reset
            </button>

            <button
              type="submit"
              disabled={updateProfile.isPending || !isDirty}
              className="flex h-10 items-center justify-center gap-1.5 rounded-[6px] bg-[#c96a00] px-4 text-[12px] font-semibold text-white transition hover:bg-[#b75f00] active:scale-[0.995] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {updateProfile.isPending ? (
                <>
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />
                  Saving
                </>
              ) : (
                <>
                  <Save size={15} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

interface ProfileFactProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

function ProfileFact({
  icon: Icon,
  label,
  value,
}: ProfileFactProps) {
  return (
    <div className="flex items-center gap-3 rounded-[4px] bg-[#f7f8fa] px-3 py-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] bg-white text-[#697b98]">
        <Icon size={15} />
      </div>

      <div className="min-w-0">
        <p className="text-[7px] font-semibold uppercase tracking-[0.08em] text-[#9099a6]">
          {label}
        </p>

        <p className="mt-0.5 truncate text-[10px] font-medium text-[#263241]">
          {value}
        </p>
      </div>
    </div>
  );
}

interface ProfileInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  label: string;
  error?: string;
}

function ProfileInput({
  id,
  label,
  icon: Icon,
  error,
  ...props
}: ProfileInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-[10px] font-bold tracking-[0.08em] text-[#52627d]"
      >
        {label}
      </label>

      <div className="relative">
        <Icon
          size={16}
          strokeWidth={1.8}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#697b98]"
        />

        <input
          id={id}
          className={`h-[42px] w-full rounded-[6px] border bg-white pl-10 pr-3 text-[13px] text-[#172033] outline-none transition placeholder:text-[#8b96a6] focus:ring-2 focus:ring-[#c87512]/10 disabled:cursor-not-allowed disabled:bg-[#f7f8fa] ${
            error
              ? "border-red-400 focus:border-red-400"
              : "border-[#d9e0ea] focus:border-[#c87512]"
          }`}
          {...props}
        />
      </div>

      {error && (
        <p className="mt-1.5 text-[10px] text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
