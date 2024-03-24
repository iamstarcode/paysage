"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { FormState } from "@/types"
import { handleValidationError } from "@/utils/helpers"
import { forgotSchema, resetSchema, signUpSchema } from "@/utils/schema"
import { createClient } from "@/utils/supabase/server"

export async function signIn(prevState: any, formData: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return handleValidationError(result)
  }
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  })

  if (error) {
    return {
      message: error.message,
      type: "Error",
    } as FormState
  }

  return redirect("/dashboard")
}

export async function signUp(prevState: any, formData: FormData) {
  const origin = headers().get("origin")
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const result = signUpSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  })

  if (!result.success) {
    return handleValidationError(result)
  }

  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    return {
      message: error.message,
      type: "Error",
    } as FormState
  }

  return {
    message: "Check email to continue sign in process",
    type: "Success",
  } as FormState
}

export async function sendForgotPasswordResetLink(
  prevState: any,
  formData: FormData
) {
  const result = forgotSchema.safeParse({
    email: formData.get("email") as string,
  })

  if (!result.success) {
    return handleValidationError(result)
  }

  const origin = headers().get("origin")
  const supabase = createClient()

  try {
    await supabase.auth.resetPasswordForEmail(result.data.email, {
      redirectTo: `${origin}/auth/reset-password/`,
    })
  } catch (error) {
    console.error("Error sending reset password email:", error)
    return {
      message: "Error sending reset password email",
      type: "Error",
    } as FormState
  }

  return {
    message: `A password reset link has been sent to your email address. Please
    follow the instructions in the email to reset your password.`,
    type: "Success",
  } as FormState
}

export const signOut = async () => {
  const supabase = createClient()
  await supabase.auth.signOut()
  return redirect("/auth/login")
}
