"use server"

import { TransferSchema } from "@/utils/schema"
import { getUserQuery } from "@/utils/supabase/queries"
import { createClient } from "@/utils/supabase/server"

export async function transferFromWallet(prevState: any, formData: FormData) {
  const data = {
    reciever: formData.get("reciever"),
    amount: formData.get("amount"),
    currency: formData.get("currency")!,
  }

  const result = TransferSchema.safeParse(data)
  if (!result.success) {
    let errorMsg: string[] = []

    result.error.issues.forEach((issue) => {
      errorMsg.push(issue.path[0] + ": " + issue.message)
    })

    return { errors: errorMsg, message: "Error: Please Check Your Input!" }
  }

  const {
    data: { user },
  } = await getUserQuery()

  const recieverId = formData.get("to") as string

  const supabase = createClient()
  try {
    // Check if wallets exist and belong to the user
    const { data: fromWallet, error: fromWalletError } = await supabase
      .from("wallets")
      .select("*")
      .eq("id", user?.id + "ss"!)
      .single()

    if (fromWalletError || !fromWallet) {
      console.log("ddd")
      return {
        message: "Wallet does not belong to you",
      }
      throw new Error("Invalid source wallet ID or unauthorized access")
    }

    const { data: toWallet, error: toWalletError } = await supabase
      .from("wallets")
      .select("*")
      .eq("id", result.data.reciever)
      .single()

    if (toWalletError || !toWallet) {
      throw new Error("Invalid destination wallet ID")
    }

    /*  // Validate sufficient balance
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
    } */
    return {
      message: "Please enter a valid email",
    }
    console.log("Transfer successful!")
  } catch (error: any) {
    console.error(error.message)
  }
}
