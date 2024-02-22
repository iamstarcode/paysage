import { createClient } from "@/utils/supabase/client"
import { SupabaseClient } from "@supabase/supabase-js"

const supabase = createClient()

export const balanceWithCurrencyQuery = supabase.from("wallets").select(`
  balance,
  currencies(*)
`)

export const getProfileByUsernameQuery = (
  username: string,
  supabase: SupabaseClient
) =>
  supabase
    .from("profiles")
    .select("id,username")
    .eq("username", username)
    .single()

export const getUserWalletByIdQuery = (id: string, supabase: SupabaseClient) =>
  supabase.from("wallets").select("balance,currencies(*)").eq("user_id", id!)
