import { createClient } from "@/utils/supabase/client"
import {
  useInfiniteOffsetPaginationQuery,
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

export const useTransactions = () => {
  const { data, isLoading, error, mutate } = useQuery(
    supabaseClient.from("transactions").select("*").limit(3)
  )
  return { data, isLoading, error, mutate }
}

export const useRecentTransactions = () => {
  const { data, isLoading, error, mutate } = useInfiniteOffsetPaginationQuery(
    supabaseClient.from("transactions").select("*").limit(3),
    {}
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

export const useUser = async () => {
  const {
    data: { user },
  } = await supabaseClient.auth.getUser()

  return { user }
  // return { data, isLoading, error, mutate }
}

export const useGetFiatTransfer = async (id: number) => {
  const { data, isLoading, error, mutate } = useQuery(
    supabaseClient
      .from("transactions")
      .select("*, fiat_transfers!inner(*)")
      .eq("user_id", id)
      .single()
  )
  return { data, isLoading, error, mutate }
}

export type BalanceWithCurrency = Pick<ReturnType<typeof useWallet>, "data">
