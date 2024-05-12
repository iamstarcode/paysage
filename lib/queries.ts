import { SupabaseClient } from "@supabase/supabase-js"

export function getCurrencies(clinet: SupabaseClient) {
  return clinet.from("currencies").select("*")
}
