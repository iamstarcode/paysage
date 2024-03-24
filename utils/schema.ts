import { z } from "zod"

export const todoSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(5),
})

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password should contain at least 6 character",
  }),
})
export const resetSchema = signUpSchema.omit({ email: true })
export const forgotSchema = signUpSchema.omit({ password: true })

export const TransferSchema = z.object({
  reciever: z.string().min(3),
  amount: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .gte(50, "Must be 50 and above"),
  currency: z.string().min(1, { message: "Please select a wallet" }),
})
