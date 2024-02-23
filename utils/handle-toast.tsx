"use client"

import * as React from "react"
import { FormState } from "@/types"
import { toast } from "sonner"

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
    toast.success(state.message)
  } else if (state.type === "Error") {
    toast.error(state.message)
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
