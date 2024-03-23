"use client"

import * as React from "react"
import { CurrencyType } from "@/types"

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
          <div className="flex items-center justify-center space-x-2 px-2">
            <ScrollArea className="h-72 w-full p-4 rounded-md border">
              <div className=" space-y-4">
                {currencies &&
                  currencies?.map((currency) => (
                    <div>
                      <div
                        key={currency.id}
                        className="inline-flex w-full justify-between"
                      >
                        <p>{currency.currency}</p>
                        <Switch />
                      </div>
                      <Separator className="my-2" />
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
            </ScrollArea>
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
