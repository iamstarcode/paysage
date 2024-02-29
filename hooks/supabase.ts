import { Transaction } from "@/types"
import { createClient } from "@/utils/supabase/client"
import {
  useInfiniteOffsetPaginationQuery,
  useInsertMutation,
  useOffsetInfiniteScrollQuery,
  useQuery,
} from "@supabase-cache-helpers/postgrest-swr"
import useSWR from "swr"

const supabase = createClient()

export const useCurrencies = () => {
  const { data, isLoading, error, mutate } = useQuery(
    supabase.from("currencies").select("*")
  )
  return { data, isLoading, error, mutate }
}

export const useWallet = () => {
  const { data, isLoading, error, mutate } = useQuery(
    supabase.from("wallets").select(`
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
  const { data, loadMore, isValidating, error, isLoading, mutate } =
    useOffsetInfiniteScrollQuery(
      supabase
        .from("transactions")
        .select(
          `
      id,
      sender_id,
      receiver_id,
      amount,currency,
      transaction_type,
      description,
      transaction_date,
      status
    `
        )
        .order("id", { ascending: false }),
      { pageSize: 10 }
    )

  return {
    transactions: data,
    isTranasctionsLoading: isLoading,
    loadMoreTranasction: loadMore,
    isTranasctionsValidating: isValidating,
    transactionsError: error,
    mutate,
  }
}

export const useRecentTransactions = () => {
  const { data, isValidating, error } = useQuery(
    supabase
      .from("transactions")
      .select("id,")
      .order("id", { ascending: false })
  )

  // return { data, isLoading, error, mutate }
}

export const useRecentFiatTransactions = () => {
  const { data, isLoading, error, mutate } = useQuery(
    supabase.from("fiat_transfers").select("*").limit(5)
  )
  return { data, isLoading, error, mutate }
}

export const useProfileById = (id: string) => {
  const { data, isLoading, error, mutate } = useQuery(
    supabase.from("profiles").select("*").eq("id", id).single()
  )
  return {
    profile: data,
    isProfileLoading: isLoading,
    profileError: error,
    mutate,
  }
}

export const useUser = () => {
  const {
    data,
    isLoading: isUserLoading,
    error: userError,
  } = useSWR("user", () => supabase.auth.getUser())
  return { user: data?.data.user, isUserLoading, userError }
}

export const useGetFiatTransfer = (id: number) => {
  const { data, isLoading, error, mutate } = useQuery(
    supabase
      .from("transactions")
      .select("*, fiat_transfers!inner(*)")
      .eq("id", id)
      .single()
  )

  return {
    transfer: data,
    isTransferLoading: isLoading,
    transferError: error,
    mutate,
  }
}

export type BalanceWithCurrency = Pick<ReturnType<typeof useWallet>, "data">
