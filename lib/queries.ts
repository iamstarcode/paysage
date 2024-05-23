import { SupabaseClient } from "@supabase/supabase-js"

export function getCurrencies(clinet: SupabaseClient) {
  return clinet.from("currencies").select("*")
}

export function getDepositAddress(
  client: SupabaseClient,
  currency: string,
  convertTo: string | null = null
) {
  if (!convertTo) {
    return client
      .from("deposit_addresses")
      .select("*")
      .eq("currency", currency)
      .single()
  }

  return client
    .from("deposit_addresses")
    .select("*")
    .eq("currency", currency)
    .is("convert_to", null)
    .single()
}
