"use client"

import React, { useState } from "react"

export function DepositFiat() {
  const [step, setStep] = useState(1)
  const [selectedOption, setSelectedOption] = useState<null | string>(null)

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    setStep(2) // Move to the next step
  }

  const handleGoBack = () => {
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
                Option 1
              </button>
            </li>
            <li>
              <button onClick={() => handleOptionSelect("Option 2")}>
                Option 2
              </button>
            </li>
            <li>
              <button onClick={() => handleOptionSelect("Option 3")}>
                Option 3
              </button>
            </li>
          </ul>
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
