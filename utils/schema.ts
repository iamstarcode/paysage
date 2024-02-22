import { z } from "zod"

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password should contain at least 6 character",
  }),
})

export const TransferSchema = z.object({
  reciever: z.string().min(3),
  amount: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .gte(50, "Must be 50 and above"),
  currency: z.string().min(1, { message: "Please select a wallet" }),
})
