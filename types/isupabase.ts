import { balanceWithCurrencyQuery } from "@/utils/supabase/queries"
import { QueryData } from "@supabase/supabase-js"

export type BalanceWithCurrency = QueryData<typeof balanceWithCurrencyQuery>
