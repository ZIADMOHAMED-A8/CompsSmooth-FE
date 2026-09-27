import { z } from "zod";
import { passwordSchema } from "./passwordSchema";

// export const loginSchema = z.object({
//   body: z.object({
//     email: z.string().trim().toLowerCase().email("A valid email is required."),
//     password: passwordSchema,
//   }),
// });


export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("A valid email is required."),
  password: passwordSchema,
})

export type LoginFormValues = z.infer<typeof loginSchema>;