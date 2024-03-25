import { createClient } from "@/utils/supabase/server"

export async function getWallet() {
  const supabase = createClient()
  const { data, error } = await supabase.from("wallets").select("*")
  return { data, error }
}
