"use client"

import { useEffect } from "react"
import Link from "next/link"
import { FormState } from "@/types"
import { handleToast } from "@/utils/handle-toast"
import { forgotSchema } from "@/utils/schema"
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

import { sendForgotPasswordResetLink } from "../actions"

export default function ForgotPassword() {
  const [formState, formAction] = useFormState(
    sendForgotPasswordResetLink,
    {} as FormState
  )

  useEffect(() => {
    handleToast(formState!)
  }, [formState])

  const form = useForm<z.infer<typeof forgotSchema>>({
    resolver: zodResolver(forgotSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  })

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
        <CardDescription>
          Enter your email below to send a password reset mail
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

            <SubmitButton
              formAction={formAction}
              type="submit"
              className="w-full"
              text="Send Reset Email"
              pendingText="Sending Reset Email..."
            />

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?
              <Link className="underline" href="/auth/login">
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
