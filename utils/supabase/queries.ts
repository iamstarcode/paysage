import { createClient } from "@/utils/supabase/client"
import { SupabaseClient } from "@supabase/supabase-js"

import { Database } from "@/types/g-supabase"

const supabase = createClient()

export const balanceWithCurrencyQuery = supabase.from("wallets").select(`
  balance,
  currencies(*)
`)

export const getProfileByUsernameQuery = (
  username: string,
  supabase: SupabaseClient
) => supabase.from("profiles").select("*").eq("username", username).single()

export const getProfileByIdQuery = (
  id: string,
  supabase: SupabaseClient<Database>
) => supabase.from("profiles").select("*").eq("id", id).single()

export const getUserWalletByIdQuery = (
  id: string,
  supabase: SupabaseClient<Database>
) => supabase.from("wallets").select("balance,currencies(*)").eq("user_id", id!)
