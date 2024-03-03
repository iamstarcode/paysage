"use client"

import { useEffect, useState } from "react"
import { handleToast } from "@/utils/handle-toast"
import { TransferSchema } from "@/utils/schema"
import { balanceWithCurrencyQuery } from "@/utils/supabase/queries"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { BalanceWithCurrency } from "@/types/supabase"
import { useTransactions, useWallet } from "@/hooks/supabase"
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

import { Button } from "./ui/button"

const initialState = {
  message: "",
  errors: [],
}
export default function Transfer() {
  //const [wallets, setWallet] = useState<BalanceWithCurrency | null>()

  const { data: wallets, mutate } = useWallet()
  const { mutate: mutateTransactions } = useTransactions()

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
      /*   currency: "",
      reciever: "",
      amount: 0, */
    },
  })

  async function setDefaults() {
    const { data } = await balanceWithCurrencyQuery
    //  setWallet(data)
  }

  useEffect(() => {
    async function _mutate() {
      await mutateTransactions()
      await mutate()
    }
    if (state?.type == "Success") {
      _mutate()
      form.reset()
      //window.location.reload()
    }
    handleToast(state!)
  }, [state])

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
    <div className="space-y-4">
      <Form {...form}>
        <form>
          <Card>
            <CardHeader>
              <CardTitle>Send money </CardTitle>
              <CardDescription>Transfer money to someone else.</CardDescription>
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
  )
}
