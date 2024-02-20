"use server"

import { createClient } from "@/utils/supabase/server"

export async function transferBalance(prevState: any, formData: FormData) {
  const fromWalletId = formData.get("from") as string
  const toWalletId = formData.get("to") as string

  const supabase = createClient()
  try {
    // Check if wallets exist and belong to the user
    const { data: fromWallet, error: fromWalletError } = await supabase
      .from("wallets")
      .select("*")
      .eq("id", fromWalletId)
      .single()

    if (fromWalletError || !fromWallet) {
      throw new Error("Invalid source wallet ID or unauthorized access")
    }

    const { data: toWallet, error: toWalletError } = await supabase
      .from("wallets")
      .select("*")
      .eq("id", toWalletId)
      .single()

    if (toWalletError || !toWallet) {
      throw new Error("Invalid destination wallet ID")
    }

    // Validate sufficient balance
    if (fromWallet.balance < amount) {
      throw new Error("Insufficient funds")
    }

    // Start a transaction
    const { data: transaction, error: transactionError } = await supabase
      .from("wallets")
      .update({ balance: supabase.raw("balance - amount") })
      .eq("id", fromWalletId)
      .single()

    if (transactionError) {
      throw new Error("Failed to deduct balance from source wallet")
    }

    // Update destination wallet balance
    const { data: updatedWallet, error: updateError } = await supabase
      .from("wallets")
      .update({ balance: supabase.raw("balance + amount") })
      .eq("id", toWalletId)
      .single()

    if (updateError) {
      throw new Error("Failed to add balance to destination wallet")
    }

    // Record transaction
    const { data: insertedTransaction, error: insertError } = await supabase
      .from("transactions")
      .insert({
        from_wallet_id: fromWalletId,
        to_wallet_id: toWalletId,
        amount,
        currency_id: fromWallet.currency_id,
      })

    if (insertError) {
      throw new Error("Failed to record transaction")
    }

    console.log("Transfer successful!")
  } catch (error) {
    console.error(error.message)
  }
}
