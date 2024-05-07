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

interface CallbackTransaction {
  id: number
  currency: string
  transaction_type: string
  type: string
  address: string
  tag: string | null
  amount: string
  txid: string
  riskscore: string | null
  confirmations: number | string
}

interface CallbackCryptoAddress {
  id: number
  currency: string
  address: string
  foreign_id: string
  tag: string | null
}

interface CallbackCurrency {
  currency: string
  amount: string
  amount_minus_fee?: string
}

interface CallbckFee {
  type: string
  currency: string
  amount: string
}

export type CallbackData = {
  id: number
  type: "deposit" | "withdrawal" | "invioce"
  crypto_address: CallbackCryptoAddress
  currency_sent: CallbackCurrency
  currency_received: CallbackCurrency
  transactions: CallbackTransaction[]
  fees: CallbckFee[]
  error: string
  status: "processing" | "confirmed" | "fialed" | "not_confirmed" | undefined
}

type CryptoAddress = {
  id: number
  currency: string
  address: string
  tag: string | null
  foreign_id: string
}

type Currency = {
  currency: string
  amount: string
  amount_minus_fee?: string // Optional field
}

export type Transaction = {
  id: number
  currency: string
  transaction_type: string
  type: string
  address: string
  tag: string | null
  amount: string
  txid: string
  riskscore: number | null
  confirmations: string
}

type Fee = {
  type: string
  currency: string
  amount: string
}

export type CryptoDepositType = {
  id: number
  type: string
  crypto_address: CryptoAddress
  currency_sent: Currency
  currency_received: Currency
  transactions: Transaction[]
  fees: Fee[]
  errors: string[]
  status: string
}
