"use client"

import React, { useState } from "react"
import { CurrencyType } from "@/types"
import { createClient } from "@/utils/supabase/client"
import {
  AlertCircle,
  Check,
  CheckCheck,
  CheckCheckIcon,
  CheckCircle,
  CheckCircle2,
  Copy,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const DepositFiat = ({ currency }: { currency: CurrencyType }) => {
  const supabase = createClient()

  const [step, setStep] = useState(1)
  const [address, setAddress] = useState<string | undefined>()
  const [loading, setIsLoading] = useState(false)

  type Option = "BTC" | "ETH" | null
  const [selectedOption, setSelectedOption] = useState<Option>(null)

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option)
  }

  const handleNext = async () => {
    if (selectedOption) {
      setStep(2) // Move to the next step if an option is selected
      const {
        data: { user },
      } = await supabase.auth.getUser()

      //console.log(selectedOption)
      const { data: depositAddress } = await supabase
        .from("deposit_addresses")
        .select("*")
        .eq("currency", selectedOption)
        .eq("convert_to", currency.currency!)
        .single()

      if (depositAddress) {
        setAddress(depositAddress.address)
        console.log("addres exist")
        return
      } else {
        const res = await fetch("/api/address-take", {
          method: "POST",
          body: JSON.stringify({
            currency: selectedOption,
            foreign_id: user?.id,
            convert_to: currency.currency,
          }),
        })

        const takenAddress = await res.json()

        await supabase.from("deposit_addresses").insert({
          currency: selectedOption,
          user_id: user?.id!,
          address: takenAddress.data.address,
          convert_to: currency.currency!,
        })

        console.log("generated address")
        setAddress(takenAddress.data.address)
      }
    }
  }

  const handleGoBack = () => {
    setSelectedOption(null) // Reset selected option
    setStep(1) // Go back to the previous step
    setAddress(undefined)
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Top Up your {currency.currency}</CardTitle>
          <CardDescription>Top Up your Cash Account Balance.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Choose a crypto currency</p>
          {step === 1 && (
            <div className="flex flex-col mt-5 space-y-2">
              <div
                onClick={() => handleOptionSelect("BTC")}
                className="flex items-center justify-between px-2 py-2 border rounded-lg border-slate-300"
              >
                <div className="inline-flex items-center space-x-2">
                  <div className="w-8 h-8 bg-black rounded-full"></div>
                  <h2 className="font-bold">BTC</h2>
                </div>
                {selectedOption === "BTC" && <CheckCircle2 />}
              </div>

              <div
                onClick={() => handleOptionSelect("ETH")}
                className="flex items-center justify-between px-2 py-2 border rounded-lg border-slate-300"
              >
                <div className="inline-flex items-center space-x-2">
                  <div className="w-8 h-8 bg-black rounded-full"></div>
                  <h2 className="font-bold">ETH</h2>
                </div>
                {selectedOption === "ETH" && <CheckCircle2 />}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="w-4 h-4" />

                <AlertDescription>
                  All the funds received on this address will be automatically
                  converted into {currency.currency}.
                </AlertDescription>
              </Alert>
              <div className="relative w-full">
                <Input
                  disabled
                  className="w-full border-[1px] border-gray-300 px-4 py-6"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                  <Copy className="" />
                </div>
              </div>

              <p className="text-sm">
                Please send only BTC to this address. Sending any other currency
                may result in the funds lost.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {step == 2 && (
            <Button onClick={handleGoBack} variant="outline">
              Back
            </Button>
          )}
          {step == 1 && (
            <Button disabled={!selectedOption} onClick={handleNext}>
              Next
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

export default DepositFiat

export function CardWithForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid items-center w-full gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}

export function AlertDestructive() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="w-4 h-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  )
}
