"use client"

import { useEffect, useState } from "react"
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

type CurrencyCheckType = CurrencyType & { isChecked: boolean }

export function DrawerDemo() {
  const [checkedItems, setCheckedItems] = useState<CurrencyCheckType[] | null>()

  useEffect(() => {
    async function getCurrencies() {
      const res = await fetch("/api/currencies", { method: "POST" })
      const data = await res.json()

      setCheckedItems(
        data.data?.map((item: CurrencyType) => ({ ...item, isChecked: false }))
      )
    }

    getCurrencies()
  }, [])

  const toggleItem = (index: number) => {
    const updatedItems = [...checkedItems!]
    updatedItems[index].isChecked = !updatedItems[index].isChecked
    setCheckedItems(updatedItems)
  }

  const getAllCheckedStates = () => {
    const selectedItems = checkedItems?.filter((item) => item.isChecked)
    // Do whatever you need with the selected items
    console.log("Selected items:", selectedItems)
  }

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
                {checkedItems &&
                  checkedItems?.map((currency, index) => (
                    <div key={currency.id}>
                      <div className="inline-flex w-full justify-between">
                        <p>{currency.currency}</p>
                        <Switch
                          checked={checkedItems[index].isChecked}
                          onCheckedChange={() => toggleItem(index)}
                        />
                      </div>
                      <Separator className="my-2" />
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </div>
          <DrawerFooter>
            <Button onClick={getAllCheckedStates}>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
