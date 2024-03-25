"use server"

import { revalidatePath } from "next/cache"
import { FormState } from "@/types"
import {
  generateTransactionReference,
  handleValidationError,
  selectBalanceByCurrency,
} from "@/utils/helpers"
import { TransferSchema } from "@/utils/schema"
import {
  getProfileByIdQuery,
  getProfileByUsernameQuery,
  getUserWalletByIdQuery,
} from "@/utils/supabase/queries"
import { createClient } from "@/utils/supabase/server"

export async function transferFromWallet(prevState: any, formData: FormData) {
  /*   const result = TransferSchema.safeParse(
    Object.fromEntries(formData.entries())
  )

  if (!result.success) {
    return handleValidationError(result)
  }

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  try {
    const { data: reciever, error: recieverError } =
      await getProfileByUsernameQuery(result.data.reciever, supabase)

    if (recieverError || !reciever) {
      return {
        message: "Reciever not found!",
        type: "Error",
      } as FormState
    }

    const { data: senderWallet, error: senderError } =
      await getUserWalletByIdQuery(user?.id!, supabase)

    const { data: recieverWallet, error: recieverWalletError } =
      await getUserWalletByIdQuery(reciever?.id!, supabase)

    //Select the balance given by the currency
    const wallet = selectBalanceByCurrency(senderWallet, +result.data.currency)

    if (wallet.balance < result.data.amount) {
      return {
        message: "Insufficient fund!",
        type: "Error",
      } as FormState
    }

    const { error: err } = await supabase
      .rpc("transfer_funds", {
        sender_id: user?.id!,
        receiver_id: reciever?.id!,
        amount: result.data.amount,
        _currency_id: +result.data.currency,
      })
      .single()

    if (!err) {
      //four queries
      const { data: senderProfile } = await getProfileByIdQuery(
        user?.id!,
        supabase
      )

      const { data: trans } = await supabase
        .from("transactions")
        .insert({
          amount: result.data.amount,
          transaction_type: "FIAT",
          sender_id: user?.id!,
          receiver_id: reciever.id,
          currency: result.data.currency,
          receiver_description: `Recieved from ${senderProfile?.first_name} ${senderProfile?.last_name}`,
          sender_description: `Transfer to ${reciever.first_name} ${reciever.last_name}`,
          status: "Completed",
        })
        .select()
        .single()

      //Sender
      const { data } = await supabase
        .from("fiat_transfers")
        .insert({
          id: trans?.id,
          user_id: senderProfile?.id,
          amount: -result.data.amount,
          sender_account: senderProfile?.username,
          receiver_account: reciever?.username,
          sender_name: `${senderProfile?.first_name} ${senderProfile?.last_name}`,
          receiver_name: `${reciever.first_name} ${reciever.last_name}`,
          _provider: "PaySage",
          transaction_id: generateTransactionReference("F"),
        })
        .select()
        .single()

      //Reciever
      await supabase.from("fiat_transfers").insert({
        ...data,
        id: trans?.id,
        user_id: reciever?.id,
        amount: result.data.amount,
        transaction_id: generateTransactionReference("F"),
      })

      return {
        message: "Transfer Complete",
        type: "Success",
      } as FormState
    } else {
      console.log(err)
      return {
        message: "An error Occured",
        type: "Error",
      } as FormState
    }
  } catch (error: any) {
    console.error(error.message)
  } */

  const supabase = createClient()
  await supabase.from("wallets").update({ balance: 1200 }).eq("id", 1)

  revalidatePath("dashboard/wallet")

  return {
    message: "Transfer Complete",
    type: "Success",
  } as FormState
}
