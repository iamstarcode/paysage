import { Tables } from "./g-supabase"

export type FormState = {
  message?: string
  errors?: any[]
  type?: "ValidationError" | "WarningError" | "Error" | "Success"
}

//export type Transaction = Tables<"transactions">

export type CurrencyType = {
  currency: string
  deposit_fee_percent: string
  id: number
  minimum_amount: string
  precision: number
  type: "crypto" | "fiat"
  withdrawal_fee_percent: string
}

interface Transaction {
  id: number
  currency: string
  transaction_type: "deposit" | "withdrawal" | "invoice"
  type: string
  address: string
  tag: string | null
  amount: string
  txid: string
  riskscore: string
  confirmations: number
}

interface CryptoAddress {
  id: number
  currency: string
  address: string
  foreign_id: string
  tag: string | null
}

interface Currency {
  currency: string
  amount: string
  amount_minus_fee?: string
}

interface Fee {
  type: string
  currency: string
  amount: string
}

interface DepositData {
  id: number
  type: string
  crypto_address: CryptoAddress
  currency_sent: Currency
  currency_received: Currency
  transactions: Transaction[]
  fees: Fee[]
  error: string
  status: string
}
