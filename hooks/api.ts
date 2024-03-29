/* async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
} */

import { CurrencyType } from "@/types"
import useSWR from "swr"

const fetcher = async (
  url: string | URL | Request,
  requestInit?: RequestInit
) => {
  const response = await fetch(url, requestInit)
  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }
  return response.json()
}

export function useCurrencies(requestInit: RequestInit) {
  const { data, error, isLoading } = useSWR("/api/currencies", () =>
    fetcher("/api/currencies", requestInit)
  )

  return {
    currencies: data?.data as CurrencyType[],
    isCurrenciesLoading: isLoading,
    currencyError: error,
  }
}
