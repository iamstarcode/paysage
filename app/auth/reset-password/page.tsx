"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { resetSchema } from "@/utils/schema"
import { createClient } from "@/utils/supabase/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

///import { supabase } from "../utils/initSupabase"

export default function ResetPassword({
  searchParams,
}: {
  searchParams: { code: string; message: string; error: string }
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  const supabase = createClient()

  const [success, setSuccess] = useState(false)
  //const { access_token: accessToken } = router.query

  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    mode: "onBlur",
    defaultValues: {
      password: "",
    },
  })
  const handleResetPassword = async (event: any) => {
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
  }

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Change Password</CardTitle>
        <CardDescription>Enter your new password</CardDescription>
      </CardHeader>
      <CardContent>
        {success ? (
          <p>Password changed succesfully redirecting now.</p>
        ) : (
          <Form {...form}>
            <form onSubmit={handleResetPassword} className="space-y-3">
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

              <Button disabled={loading} type="submit" className="w-full">
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Reset Password
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  )
}
