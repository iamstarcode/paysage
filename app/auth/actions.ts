"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { FormState } from "@/types"
import { handleValidationError } from "@/utils/helpers"
import { signUpSchema } from "@/utils/schema"
import { createClient } from "@/utils/supabase/server"

const supabase = createClient()

export async function signIn(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const result = signUpSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  })

  // Return early if the form data is invalid
  if (!result.success) {
    return handleValidationError(result)
  }
  /*   if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  } */

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect(
      `/auth/login?message=${error.message}&error=${error.status}`
    )
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
    return redirect(
      `/auth/login?message=${error.message}&error=${error.status}`
    )
  }

  return redirect("/auth/login?message=Check email to continue sign in process")
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
