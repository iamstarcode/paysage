import Image from "next/image"
import { CurrencyType } from "@/types"
import { getURL } from "@/utils/helpers"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

//import { Deposit } from "../deposit/deposit"

export default async function Currencies() {
  const res = await fetch(getURL() + "/api/currencies", { method: "POST" })
  const { data: data }: { data: CurrencyType[] } = await res.json()

  return (
    <div className="w-full py-12">
      <div className="container px-4 md:px-6 flex flex-col gap-4">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold tracking-tight">My Currencies</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your fiat and cryptocurrencies with ease.
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {data.map(({ id, currency }: CurrencyType) => (
            <div
              key={id}
              className=" border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm"
            >
              <div className="flex flex-col gap-4 h-full items-center justify-center p-4 w-full">
                <Image
                  className="text-lg font-semibold tracking-tight"
                  height={48}
                  width={48}
                  alt={`${currency} icon`}
                  src={`/img/currencies/${currency.toLocaleLowerCase()}.svg`}
                />

                {/* <Deposit /> */}
                <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
                  {currency}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
