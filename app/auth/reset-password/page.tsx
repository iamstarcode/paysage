"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FormState } from "@/types"
import { handleToast } from "@/utils/handle-toast"
import { resetSchema } from "@/utils/schema"
import { createClient } from "@/utils/supabase/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, Loader2 } from "lucide-react"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
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

import { resetPassword } from "../actions"

export default function ResetPassword({
  searchParams,
}: {
  searchParams: {
    code: string
    message: string
    error: string
    error_description: string
  }
}) {
  const [formState, formAction] = useFormState(resetPassword, {} as FormState)

  useEffect(() => {
    handleToast(formState!)
  }, [formState])

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    mode: "onBlur",
    defaultValues: {
      password: "",
    },
  })
  /*   const handleResetPassword = async (event: any) => {
    event.preventDefault()

    //setLoading(true)
    console.log(searchParams.code)

    try {
      //await supabase.auth.exchangeCodeForSession(searchParams.code)
      const { error } = await supabase.auth.updateUser({
        password: form.getValues("password"),
      })

      if (error) {
        throw error
      }

      router.replace(`${window.location.origin}/dashboard`)
      // router.push("/login")
    } catch (error) {
      console.error("Error resetting password:", error)
      //setError(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  } */

  return (
    <Card className="mx-auto min-w-96 max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Change Password</CardTitle>
        <CardDescription>Enter your new password</CardDescription>
      </CardHeader>
      <CardContent>
        {searchParams.error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {searchParams?.error_description!}
            </AlertDescription>
          </Alert>
        ) : (
          <Form {...form}>
            <form className="space-y-3">
              <input
                type="text"
                className="hidden"
                name="code"
                value={searchParams.code}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter new password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <SubmitButton
                formAction={formAction}
                type="submit"
                className="w-full"
                text="Reset Password"
                pendingText="Reseting  Password..."
              />
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  )
}
