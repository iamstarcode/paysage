import { Suspense } from "react"
import { CurrencyType } from "@/types"
import { getURL } from "@/utils/helpers"
import { createClient } from "@/utils/supabase/server"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function Deposit() {
  const supabase = createClient()
  let currencies
  try {
    const res = await fetch(getURL() + "/api/currencies", { method: "POST" })

    currencies = await res.json()
  } catch (error) {
    console.log(error)
  }
  const allCurrency: CurrencyType[] = currencies?.data
  const crypto = allCurrency?.filter((currency) => currency.type == "crypto")
  const fiat = allCurrency?.filter((currency) => currency.type == "fiat")

  const { data: wallets } = await supabase.from("wallets").select("*")

  const mapped = wallets?.map((wallet) => {
    const a = allCurrency?.find(
      (currency: CurrencyType) => wallet.currency == currency.currency
    )

    return {
      ...a,
      wallet,
    }
  })

  console.log(mapped, "cdcdc")

  /*   await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 10000)
  }) */

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <Tabs defaultValue="all" className="">
        <TabsList className="grid max-w-fit grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="fiat">Fiat</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All currencies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Suspense fallback={<Skeleton />}>
                  {allCurrency?.map((currency: CurrencyType) => (
                    <Card key={currency.id} className="p-4">
                      <CardContent className="p-0">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-slate-500"></div>
                            <p className="ml-4 text-sm">USD</p>
                          </div>
                          <div className="rounded-lg">
                            <span className="text-right block text-ellipsis text-sm font-semibold">
                              240.76544987
                            </span>
                            <p className="text-right text-xs text-gray-300">
                              240.8 USD
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </Suspense>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="crypto">
          <Card>
            <CardHeader>
              <CardTitle>All currencies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {/*    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Suspense fallback={<Skeleton />}>
                  {crypto.map((currency: CurrencyType) => (
                    <Card key={currency.id} className="p-4">
                      <CardContent className="p-0">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-slate-500"></div>
                            <p className="ml-4 text-sm">USD</p>
                          </div>
                          <div className="rounded-lg">
                            <span className="text-right block text-ellipsis text-sm font-semibold">
                              240.76544987
                            </span>
                            <p className="text-right text-xs text-gray-300">
                              240.8 USD
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </Suspense>
              </div> */}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="fiat">
          <Card>
            <CardHeader>
              <CardTitle>All currencies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {/*   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Suspense fallback={<Skeleton />}>
                  {fiat.map((currency: CurrencyType) => (
                    <Card key={currency.id} className="p-4 cursor-pointer">
                      <CardContent className="p-0">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-slate-500"></div>
                            <p className="ml-4 text-sm">USD</p>
                          </div>
                          <div className="rounded-lg">
                            <span className="text-right block text-ellipsis text-sm font-semibold">
                              240.76544987
                            </span>
                            <p className="text-right text-xs text-gray-300">
                              240.8 USD
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </Suspense>
              </div> */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Skeleton() {
  return (
    <div className="rounded-lg border border-gray-200 animate-pulse shadow-sm p-4">
      <div className="p-0">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
            <div className="ml-4 h-4 w-10 bg-gray-300 rounded"></div>
          </div>
          <div className="rounded-lg">
            <div className="h-4 w-16 bg-gray-300 rounded"></div>
            <div className="mt-2 h-3 w-10 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Currency({ currencies }: { currencies: CurrencyType[] }) {
  "use client"
  return (
    <Card className="p-4">
      <CardContent className="p-0">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-slate-500"></div>
            <p className="ml-4 text-sm">USD</p>
          </div>
          <div className="rounded-lg">
            <span className="text-right block text-ellipsis text-sm font-semibold">
              240.76544987
            </span>
            <p className="text-right text-xs text-gray-300">240.8 USD</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

//export default Deposit
