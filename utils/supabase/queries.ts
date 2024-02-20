import { createClient } from "@/utils/supabase/client"

const supabase = createClient()

export const balanceWithCurrencyQuery = supabase.from("wallets").select(`
  balance,
  currencies(*)
`)
