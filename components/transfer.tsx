"use client"

import { useEffect, useState } from "react"
import { TransferSchema } from "@/utils/schema"
import { createClient } from "@/utils/supabase/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { QueryData, QueryError, QueryResult } from "@supabase/supabase-js"
import { DollarSign, Euro } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Tables } from "@/types/supabase"
import { Button } from "@/components/ui/button"
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Transfer() {
  const supabase = createClient()

  const balanceWithCurrencyQuery = supabase.from("wallets").select(`
  balance,
  currencies(*)
`)

  type BalanceWithCurrency = QueryData<typeof balanceWithCurrencyQuery>

  const [wallets, setWallet] = useState<BalanceWithCurrency | null>()

  const form = useForm<z.infer<typeof TransferSchema>>({
    resolver: zodResolver(TransferSchema),
  })

  useEffect(() => {
    async function setDefaults() {
      const { data } = await balanceWithCurrencyQuery
      console.log(data, "rfrfrfr")
      setWallet(data)
    }

    setDefaults()
  }, [])

  console.log(wallets)

  function onSubmit(data: z.infer<typeof TransferSchema>) {}

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
                <div className="space-y-2">
                  <Label htmlFor="sender">Your name</Label>
                  <Input id="sender" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient's name</Label>
                  <Input id="recipient" placeholder="Enter recipient's name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input id="amount" placeholder="Enter amount" />
                </div>

                <FormField
                  control={form.control}
                  name="currency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="usd">
                            <div className="inline-flex items-center">
                              <DollarSign className="w-6 h-6" />
                              <p>USD</p>
                            </div>
                          </SelectItem>
                          <SelectItem value="EUR">
                            <Euro />
                            EUR
                          </SelectItem>
                          <SelectItem value="m@support.com">
                            m@support.com
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Send</Button>
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
