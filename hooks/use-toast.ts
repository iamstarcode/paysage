import { ReactNode } from "react"
import { ExternalToast, toast } from "sonner"

interface Props {
  type: "info" | "warning" | "error" | "success"
  message?: ReactNode
  description?: ReactNode
}
export const useToast = ({ type, message, description }: Props) => {
  const build: ExternalToast = {
    description,
  }
  if (type == "info") {
    return toast.info(message, build)
  }

  if (type == "error") {
    return toast.error(message, build)
  }

  if (type == "warning") {
    return toast.error(message, {})
  }

  return toast.success(message, build)
}
