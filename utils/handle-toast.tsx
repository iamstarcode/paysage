"use client"

import * as React from "react"
import { FormState } from "@/types"
import { ExternalToast, toast } from "sonner"

import { useToast } from "@/hooks/use-toast"

export const handleToast = (state?: FormState) => {
  if (!state) return // Handle potential undefined state

  if (state.type === "ValidationError" && state.errors?.length! > 0) {
    toast.error(state.message, {
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
    toast.warning(state.message)
  } else if (state.type === "Success") {
    useToast({ type: "success", message: state.message })
  } else if (state.type === "Error") {
    useToast({ type: "error", message: state.message })
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
