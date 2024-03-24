"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { FormState } from "@/types"
import { handleValidationError } from "@/utils/helpers"
import { signUpSchema } from "@/utils/schema"
import { createClient } from "@/utils/supabase/server"

const supabase = createClient()

export async function signIn(prevState: any, formData: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return handleValidationError(result)
  }

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

export async function sendResetPasswordLink(
  prevState: any,
  formData: FormData
) {}
export const signOut = async () => {
  const supabase = createClient()
  await supabase.auth.signOut()
  return redirect("/auth/login")
}
