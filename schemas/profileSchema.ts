import { z } from "zod";

export const profileSchema = z
  .object({
    name: z.string().trim().optional(),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email("A valid email is required.")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (value) => Boolean(value.name?.trim() || value.email?.trim()),
    "At least one profile field is required."
  );

export type ProfileFormValues = z.infer<typeof profileSchema>;
