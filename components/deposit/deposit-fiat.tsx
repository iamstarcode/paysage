"use client"

import React, { useState } from "react"
import { CurrencyType } from "@/types"
import { createClient } from "@/utils/supabase/client"
import {
  Check,
  CheckCheck,
  CheckCheckIcon,
  CheckCircle,
  CheckCircle2,
} from "lucide-react"

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
        return
      } else {
        const res = await fetch("/api/address-take", {
          method: "POST",
          body: JSON.stringify({
            currency: currency.currency,
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
        setAddress(takenAddress.data.address)
      }
    }
  }

  const handleGoBack = () => {
    setSelectedOption(null) // Reset selected option
    setStep(1) // Go back to the previous step
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
            <div>
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
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2>Step 2:</h2>
              <p>You selected: {selectedOption}</p>
              <p>display selected addres and all</p>
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
