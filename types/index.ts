import { Tables } from "./g-supabase"

export interface FormState {
  message: string
  errors?: any[]
  type?: "ValidationError" | "WarningError" | "Error" | "Success"
}

export type Transaction = Tables<"transactions">
