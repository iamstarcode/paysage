"use client"

import { useEffect, useState } from "react"
import { handleToast } from "@/utils/handle-toast"
import {
  generateReferenceNumber,
  generateTransactionReference,
} from "@/utils/helpers"
import { TransferSchema } from "@/utils/schema"
import { balanceWithCurrencyQuery } from "@/utils/supabase/queries"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { BalanceWithCurrency } from "@/types/supabase"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SubmitButton } from "@/components/SubmitButton"
import { transferFromWallet } from "@/app/dashboard/wallet/actions"

const initialState = {
  message: "",
  errors: [],
}
export default function Transfer() {
  const [wallets, setWallet] = useState<BalanceWithCurrency | null>()

  const [state, formAction] = useFormState(transferFromWallet, initialState)

  const form = useForm<z.infer<typeof TransferSchema>>({
    resolver: zodResolver(TransferSchema),
    mode: "onChange",
    resetOptions: {
      keepValues: false,
    },
    defaultValues: {
      currency: "1",
      reciever: "favour",
      amount: 50,
      /* currency: "",
      reciever: "",
      amount: 0, */
    },
  })

  async function setDefaults() {
    const { data } = await balanceWithCurrencyQuery
    setWallet(data)
  }

  useEffect(() => {
    if (state?.type == "Success") {
      window.location.reload()
    }
    handleToast(state!)
  }, [state])

  useEffect(() => {
    setDefaults()
  }, [])

  async function clientAction(formData: FormData) {
    formData.set("currency", form.getValues("currency"))

    const result = TransferSchema.safeParse(
      Object.fromEntries(formData.entries())
    )
    if (!result.success) {
      form.trigger()
    } else {
      return formAction(formData)
    }
  }

  return (
    <div className="grid md:grid-cols-2 md:gap-8">
      <div className="space-y-4">
        <Form {...form}>
          <form>
            <Card>
              <CardHeader>
                <CardTitle>Send money</CardTitle>
                <CardDescription>
                  Transfer money to someone else.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="reciever"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Reciever</FormLabel>
                        <p className="ml-auto inline-block text-sm underline">
                          Forgot your password?
                        </p>
                      </div>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Reciever Email"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Amount</FormLabel>
                      </div>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter Amount"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        required
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a wallet" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {wallets != null &&
                            wallets.map((wallet) => (
                              <SelectItem
                                key={wallet.currencies?.id}
                                value={wallet.currencies?.id! + ""}
                              >
                                {wallet.currencies?.currency_sign}
                                {wallet.balance}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <SubmitButton
                  className="ml-auto"
                  formAction={clientAction}
                  text="Transfer"
                  pendingText="Transfering..."
                />
              </CardFooter>
            </Card>
          </form>
        </Form>
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Recent transactions</CardTitle>
            <CardDescription>Your most recent money transfers.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800">
                  <img
                    alt="User 1"
                    className="rounded-full"
                    height="32"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "32/32",
                      objectFit: "cover",
                    }}
                    width="32"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Alice Johnson</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sent $100 to Bob Smith
                  </p>
                </div>
                <div className="text-right">
                  <time className="text-sm font-semibold">2 hours ago</time>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800">
                  <img
                    alt="User 2"
                    className="rounded-full"
                    height="32"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "32/32",
                      objectFit: "cover",
                    }}
                    width="32"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Bob Smith</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Received $100 from Alice Johnson
                  </p>
                </div>
                <div className="text-right">
                  <time className="text-sm font-semibold">3 hours ago</time>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800">
                  <img
                    alt="User 3"
                    className="rounded-full"
                    height="32"
                    src="/placeholder.svg"
                    style={{
                      aspectRatio: "32/32",
                      objectFit: "cover",
                    }}
                    width="32"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">Eve Jackson</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sent $50 to Mallory Williams
                  </p>
                </div>
                <div className="text-right">
                  <time className="text-sm font-semibold">5 hours ago</time>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
