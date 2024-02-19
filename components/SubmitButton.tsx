"use client"

import { Loader2 } from "lucide-react"
import { useFormStatus } from "react-dom"

import { Button, ButtonProps } from "@/components/ui/button"

type Props = ButtonProps & {
  pendingText?: string
  text: string
}

export function SubmitButton({ text, pendingText, ...props }: Props) {
  const { pending, action } = useFormStatus()

  const isPending = pending && action === props.formAction

  return (
    <Button {...props} disabled={isPending}>
      {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      {isPending ? pendingText : text}
    </Button>
  )
}
