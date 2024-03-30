"use client"

import React, { useState } from "react"
import { CurrencyType } from "@/types"
import { Check } from "lucide-react"

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
  const [step, setStep] = useState(1)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleOptionSelect = (option: React.SetStateAction<string | null>) => {
    setSelectedOption(option)
  }

  const handleNext = () => {
    if (selectedOption) {
      setStep(2) // Move to the next step if an option is selected
    } else {
      alert("Please select an option.")
    }
  }

  const handleGoBack = () => {
    setSelectedOption(null) // Reset selected option
    setStep(1) // Go back to the previous step
  }

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Step 1: Select an Option</h2>
          <ul>
            <li>
              <button onClick={() => handleOptionSelect("Option 1")}>
                Option 1{selectedOption === "Option 1 x" && <Check />}{" "}
                {/* Render the check icon if Option 1 is selected */}
              </button>
            </li>
            <li>
              <button onClick={() => handleOptionSelect("Option 2")}>
                Option 2{selectedOption === "Option 2" && <Check />}{" "}
                {/* Render the check icon if Option 2 is selected */}
              </button>
            </li>
            <li>
              <button onClick={() => handleOptionSelect("Option 3")}>
                Option 3{selectedOption === "Option 3" && <Check />}{" "}
                {/* Render the check icon if Option 3 is selected */}
              </button>
            </li>
          </ul>
          <button onClick={handleNext}>Next</button> {/* Next button */}
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Step 2: Selected Option</h2>
          <p>You selected: {selectedOption}</p>
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      )}
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
          <div className="grid w-full items-center gap-4">
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
