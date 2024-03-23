import { Tables } from "./g-supabase"

export type FormState = {
  message: string
  errors?: any[]
  type?: "ValidationError" | "WarningError" | "Error" | "Success"
}

export type Transaction = Tables<"transactions">

export type CurrencyType = {
  currency: string
  deposit_fee_percent: string
  id: number
  minimum_amount: string
  precision: number
  type: "crypto" | "fiat"
  withdrawal_fee_percent: string
}
