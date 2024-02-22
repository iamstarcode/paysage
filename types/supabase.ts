import {
  balanceWithCurrencyQuery,
  getProfileByUsernameQuery,
} from "@/utils/supabase/queries"
import { QueryData } from "@supabase/supabase-js"

export type BalanceWithCurrency = QueryData<typeof balanceWithCurrencyQuery>
export type Profile = QueryData<ReturnType<typeof getProfileByUsernameQuery>>
