import { z } from "zod";

const moneySchema = z.coerce
  .number()
  .finite()
  .nonnegative("Cost values must be zero or greater.");

const addressSchema = z
  .string()
  .trim()
  .min(1, "Address is required.")
  .regex(
    /^\d+\s+[\w\s.'#-]+,\s*[A-Za-z][A-Za-z\s.'-]*,\s*[A-Z]{2}\s+\d{5}$/,
    "Enter a valid address, e.g. 123 Main St, Atlanta, GA 30318."
  );

export const runCompsSchema = z.object({
  address: addressSchema,
  repairs: moneySchema,
  buying_costs: moneySchema,
  holding_costs: moneySchema,
  selling_costs: moneySchema,
  desired_profit: moneySchema,
});

export type RunCompsInput = z.input<typeof runCompsSchema>;
export type RunCompsFormValues = z.output<typeof runCompsSchema>;