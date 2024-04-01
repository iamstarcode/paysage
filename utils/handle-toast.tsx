"use client"

import { title } from "process"
import * as React from "react"
import { FormState } from "@/types"

import { ToastProps } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export const handleToast = (toast: any, state?: FormState) => {
  if (!state) return // Handle potential undefined state

  if (state.type === "ValidationError" && state.errors?.length! > 0) {
    toast({
      title: state.message,
      description: (
        <>
          {state?.errors!.map((error, i) => (
            <p key={i} className="capitalize text-white">
              {error}
            </p>
          ))}
        </>
      ),
    })
  } else if (state.type === "WarningError") {
    toast({ title: state.message })
  } else if (state.type === "Success") {
    toast({ title: state.message })
  } else if (state.type === "Error") {
    toast({ title: state.message })
  }
}

/*  useToast({
        message: state.message,
        type: "error",
        description: (
          <>
            {state.errors.map((error, i) => (
              <p key={i} className="capitalize text-white">
                {error}
              </p>
            ))}
          </>
        ),
      }); */
