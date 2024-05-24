import { createClient } from "@/utils/supabase/client"
import {
  useOffsetInfiniteScrollQuery,
  useQuery,
} from "@supabase-cache-helpers/postgrest-swr"

import { getCurrencies, getDepositAddress } from "@/lib/queries"

const supabase = createClient()

export const useCurrencies = () => {
  const { data, isLoading, error, mutate } = useQuery(getCurrencies(supabase))
  return { data, isLoading, error, mutate }
}

export const useWallets = () => {
  const { data, isLoading, error, mutate } = useQuery(
    supabase.from("wallets").select("*")
  )
  return {
    wallets: data,
    isWalletsLoad: isLoading,
    walletsError: error,
    mutateWallets: mutate,
  }
}

export const useWalletByCurreny = (currency) => {
  const { data, isLoading, error, mutate } = useQuery(
    supabase.from("wallets").select("*").eq("currency", currency).single()
  )
  return {
    wallet: data,
    isWalletLoading: isLoading,
    walletError: error,
    mutateWallet: mutate,
  }
}

export const useDepositAdress = (currency, convert_to = null) => {
  const { data, isLoading, error, mutate } = useQuery(
    convert_to
      ? getDepositAddress(supabase, currency, convert_to)
      : getDepositAddress(supabase, currency)
  )
  return {
    depositAdress: data,
    isDepositAdressLoading: isLoading,
    depositAddressError: error,
    mutateDepositAddress: mutate,
  }
}

export const useTransactions = () => {
  const { data, loadMore, isValidating, error, isLoading, mutate } =
    useOffsetInfiniteScrollQuery(
      supabase
        .from("transactions")
        .select("*")
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

export const useProfileById = (id) => {
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

export const useTransaction = (id, table) => {
  const { data, isLoading, error, mutate } = useQuery(
    supabase
      .from("transactions")
      .select(`*, ${table}!inner(*)`)
      .eq("id", id)
      .single()
  )

  return { transaction: data, isTranasctionLoading: isLoading }
}

export const useCryptoTransaction = (id) => {
  const { data, isLoading, error, mutate } = useQuery(
    supabase
      .from("transactions")
      .select(`*, crypto_transactions!inner(*)`)
      .eq("id", id)
      .single()
  )

  return { cryptoTransaction: data, isCryptoTransactionLoading: isLoading }
}
export const useGetFiatTransaction = (id) => {
  const { data, isLoading, error, mutate } = useQuery(
    supabase
      .from("transactions")
      .select("*, fiat_transactions!inner(*)")
      .eq("id", id)
      .single()
  )

  return {
    fiatTransaction: data,
    isTransferLoading: isLoading,
    transferError: error,
    mutate,
  }
}

//export type BalanceWithCurrency = Pick<ReturnType<typeof useWallet>, "data">
