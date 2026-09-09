import z from "zod";

z
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special symbol."
  );