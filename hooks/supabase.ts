import { createClient } from "@/utils/supabase/client"
import {
  useInsertMutation,
  useQuery,
} from "@supabase-cache-helpers/postgrest-swr"

const supabaseClient = createClient()

export const useWallet = () => {
  const { data, isLoading, error, mutate } = useQuery(
    supabaseClient.from("wallets").select(`
    balance,
    currencies(
      id,
      currency_name,
      currency_code,
      currency_sign
       )
    `)
  )
  return { data, isLoading, error, mutate }
}

export const useRecentTransactions = () => {
  const { data, isLoading, error, mutate } = useQuery(
    supabaseClient.from("transactions").select("*").limit(3)
  )
  return { data, isLoading, error, mutate }
}

export const useRecentFiatTransactions = () => {
  const { data, isLoading, error, mutate } = useQuery(
    supabaseClient.from("fiat_transfers").select("*").limit(5)
  )
  return { data, isLoading, error, mutate }
}

export const useProfile = (id: string) => {
  const { data, isLoading, error, mutate } = useQuery(
    supabaseClient.from("profiles").select("*").eq("id", id).single()
  )
  return { data, isLoading, error, mutate }
}

export type BalanceWithCurrency = Pick<ReturnType<typeof useWallet>, "data">
