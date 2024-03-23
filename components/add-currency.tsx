"use client"

import * as React from "react"
import { CurrencyType } from "@/types"
import { Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export function DrawerDemo() {
  const [currencies, setCurrencies] = React.useState<CurrencyType[] | null>()

  React.useEffect(() => {
    async function getCurrencies() {
      const res = await fetch("/api/currencies", { method: "POST" })
      const data = await res.json()

      setCurrencies(data.data)
    }

    getCurrencies()
  }, [])

  //console.log(currencies)

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle>Add New Currency</DrawerTitle>
            <DrawerDescription>
              You can add new currencies to the list of available.
            </DrawerDescription>
          </DrawerHeader>
          <div className="flex items-center justify-center space-x-2">
            <div className="p-4 pb-0 space-y-4 max-h-60 overflow-scroll">
              {currencies &&
                currencies?.map((currency) => (
                  <div
                    key={currency.id}
                    className="inline-flex w-full justify-between"
                  >
                    <p>{currency.currency}</p>
                    <Switch />
                  </div>
                ))}

              {currencies &&
                currencies?.map((currency) => (
                  <div
                    key={currency.id}
                    className="inline-flex w-full justify-between"
                  >
                    <p>{currency.currency}</p>
                    <Switch />
                  </div>
                ))}
            </div>
          </div>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
