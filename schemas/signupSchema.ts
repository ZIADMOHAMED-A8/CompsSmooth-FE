
import { z } from "zod";
import { passwordSchema } from "./passwordSchema";

export const signupSchema = z
  .object({
     email: z.string().trim().toLowerCase().email("A valid email is required."),
    name: z.string().trim().min(1, "Name is required."),
    password: passwordSchema,
  })

export type SignupFormValues = z.infer<typeof signupSchema>;