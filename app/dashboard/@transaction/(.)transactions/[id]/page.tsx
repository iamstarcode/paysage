"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Transaction from "@/components/transactions/transaction"

export default function Page() {
  const router = useRouter()

  const CustomCloseButton = () => null

  const [open, setOpen] = useState(true)

  /*   return (
    <Dialog open={open} defaultOpen>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>Transaction</DialogDescription>
        </DialogHeader>
        <Transaction />

        <DialogFooter className="sm:justify-start">
          <DialogClose>
            <Button
              onClick={() => {
                router.back()
              }}
              type="button"
              variant="secondary"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ) */

  return (
    <div className="fixed top-0 left-0 w-full max-h-screen flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="rounded-md shadow-lg bg-white p-4 max-w-2xl">
        <Transaction />
      </div>
    </div>
  )
}
