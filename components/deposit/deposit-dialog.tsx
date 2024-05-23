"use client"

import * as React from "react"
import { CurrencyType } from "@/types"
import { useMedia } from "react-use"

import { Tables } from "@/types/g-supabase"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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

import { Card, CardContent } from "../ui/card"

export default function DepositDialog({
  item,
}: {
  item: { wallet: Tables<"wallets">; currency: CurrencyType }
}) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMedia("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Card key={item.currency.id} className="p-4 cursor-pointer">
            <CardContent className="p-0">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-slate-500"></div>
                  <p className="ml-4 text-sm">{item.currency.currency}</p>
                </div>
                <div className="rounded-lg">
                  <span className="text-right block text-ellipsis text-sm font-semibold">
                    {item.wallet != undefined ? item.wallet.balance : 0}
                  </span>
                  <p className="text-right text-xs text-gray-300">
                    240.8 USD rate in usd
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Card key={item.currency.id} className="p-4 cursor-pointer">
          <CardContent className="p-0">
            <div className="flex justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-slate-500"></div>
                <p className="ml-4 text-sm">{item.currency.currency}</p>
              </div>
              <div className="rounded-lg">
                <span className="text-right block text-ellipsis text-sm font-semibold">
                  {item.wallet != undefined ? item.wallet.balance : 0}
                </span>
                <p className="text-right text-xs text-gray-300">
                  240.8 USD rate in usd
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4 " />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue="shadcn@example.com" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Username</Label>
        <Input id="username" defaultValue="@shadcn" />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  )
}
