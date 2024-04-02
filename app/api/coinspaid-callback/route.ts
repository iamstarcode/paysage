import { createHmac, timingSafeEqual } from "crypto" // For signature verification (optional)

import { revalidatePath } from "next/cache"
import { CallbackData, Transaction } from "@/types"
import { createClient, SupabaseClient } from "@supabase/supabase-js"

import { Database } from "@/types/g-supabase"

export async function POST(request: Request) {
  const { headers } = request

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const body = await request.json()
  const signature = headers.get("X-Processing-Signature")

  if (headers.get("X-Processing-Key") !== process.env.COINPAID_KEY) {
    return Response.json({ message: "Invalid Signature" }, { status: 403 })
  }

  const hmac = createHmac("sha512", process.env.COINPAID_SECRET_KEY!)
  const expectedSignature = hmac.update(JSON.stringify(body)).digest("hex")

  let checkSignature = true
  if (process.env.NODE_ENV == "development") {
    checkSignature = true
  } else if (process.env.NODE_ENV == "production") {
    checkSignature = signature === expectedSignature
  }

  //!!! replace with this signature === expectedSignature
  if (checkSignature) {
    //handle transaction type
    if (body.type == "deposit") {
      //console.log(body, "dcdcdcdcdcdcd")
      return await handeleDeposit(body, supabase)
    }
  } else {
    return Response.json({ message: "Invalid Signature" }, { status: 403 })
  }
}

const handeleDeposit = async (
  body: any,
  supabase: SupabaseClient<Database>
) => {
  //We first of all check if we have that foreign transcation id our the database
  //And inner join on parent transaction row
  const requestBody: CallbackData = body
  const { data: crypto_trasaction, error } = await supabase
    .from("crypto_transactions")
    .select("*, transactions!inner(*)")
    .eq("foreign_transaction_id", requestBody.id)
    .single()

  if (error) {
    console.log(error)
  }

  if (crypto_trasaction == null) {
    //Processing
    //This a new txn, so this has a processing status
    const { data: transaction, error } = await supabase
      .from("transactions")
      .insert({
        transaction_type: "crypto-deposit",
        amount: +requestBody.currency_sent.amount,
        currency: requestBody.currency_received.currency,
        receiver_id: requestBody.crypto_address.foreign_id,
        //receiver_description: `Processing deposit of ${requestBody.currency_received.amount_minus_fee}${requestBody.currency_received.currency}`,
        transaction_status: "processing",
      })
      .select()
      .single()

    if (error) {
      console.log(error)
    }

    if (transaction?.id) {
      await supabase.from("crypto_transactions").insert({
        id: transaction?.id,
        foreign_transaction_id: requestBody.id,
        user_id: requestBody.crypto_address.foreign_id,
      })
    }
  } else {
    //Updating!!!
    //If we have that transaction we are gonna update
    const { error } = await supabase
      .from("transactions")
      .update({ transaction_status: requestBody.status })
      .eq("id", crypto_trasaction.transactions?.id!)

    if (error) {
      console.log(error)
    }

    if (
      requestBody.status == "confirmed" &&
      crypto_trasaction.transactions?.transaction_status !== "confirmed"
    ) {
      await supabase.rpc("upsert_wallet_balance", {
        p_user_id: crypto_trasaction.user_id,
        p_amount: +requestBody.currency_received.amount_minus_fee!,
        p_currency: crypto_trasaction.transactions?.currency!,
      })

      //Maybe to send a mail or something
      //and if it failed nko, handle too
    }
  }

  return Response.json({ message: "Deposit callback done" }, { status: 201 })
}
