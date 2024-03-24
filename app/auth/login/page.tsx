"use client"

import { useEffect } from "react"
import Link from "next/link"
import { FormState } from "@/types"
import { handleToast } from "@/utils/handle-toast"
import { getURL } from "@/utils/helpers"
import { signUpSchema } from "@/utils/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SubmitButton } from "@/components/SubmitButton"
import { signIn, signUp } from "@/app/auth/actions"

export default function Login() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const [signInFormState, signInAction] = useFormState(signIn, {} as FormState)
  const [signUpFormState, signUpAction] = useFormState(signUp, {} as FormState)

  useEffect(() => {
    handleToast(signInFormState!)
  }, [signInFormState])
  useEffect(() => {
    handleToast(signUpFormState!)
  }, [signUpFormState])

  console.log(getURL(), "ff", process.env.NEXT_PUBLIC_VERCEL_URL)
  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <Link
                      className="ml-auto inline-block text-sm underline"
                      href="/auth/forgot-password"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <SubmitButton
              formAction={signInAction}
              type="submit"
              className="w-full"
              text="Sign In"
              pendingText="Signing In..."
            />

            <SubmitButton
              formAction={signUpAction}
              type="submit"
              className="w-full"
              text="Sign Up"
              pendingText="Signing Up..."
            />

            <SubmitButton
              type="button"
              className="w-full"
              variant="outline"
              text="Login with Google"
              pendingText="Logging In With Google..."
            />

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?
              <Link className="underline" href="#">
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
