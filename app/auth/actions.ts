"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { registerSchema } from "@/utils/schema"
import { createClient } from "@/utils/supabase/server"

export async function signIn(prevState: any, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const validatedFields = registerSchema.safeParse({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  })

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.log(error)
    return redirect("/auth/login?message=Could not authenticate user")
  }

  return redirect("/dashboard")
}

export async function signUp(prevState: any, formData: FormData) {
  "use server"

  const origin = headers().get("origin")
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.log(error.status, "fefwfd")
    return redirect(
      `/auth/login?message=${error.message}&error=${error.status}`
    )
  }

  return redirect("/auth/login?message=Check email to continue sign in process")
}

export const signOut = async () => {
  const supabase = createClient()
  await supabase.auth.signOut()
  return redirect("/auth/login")
}
