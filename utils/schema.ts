import { z } from "zod"

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password should contain at least 6 character",
  }),
})

export const TransferSchema = z.object({
  to: z.string(),
  from: z.string(),
  amount: z.string(),
  currency: z.string(),
})
