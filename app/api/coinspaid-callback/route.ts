import { createHmac, timingSafeEqual } from "crypto" // For signature verification (optional)
import { CallbackData, Transaction, TransactionCallback } from "@/types"
import { createClient } from "@/utils/supabase/server"

export async function POST(request: Request) {
  const { headers } = request

  const requestBody = await request.json()
  const signature = headers.get("X-Processing-Signature")

  //console.log(requestBody, "sssss")

  const receivedPublicKey = headers.get("X-Processing-Key")

  if (receivedPublicKey !== process.env.COINPAID_KEY) {
    return Response.json({ message: "Invalid Signature" }, { status: 403 })
  }

  const hmac = createHmac("sha512", process.env.COINPAID_SECRET_KEY!)
  const expectedSignature = hmac
    .update(JSON.stringify(requestBody))
    .digest("hex")

  if (signature === expectedSignature) {
    //handle transaction type
    const supabase = createClient()

    if (dummyData.type == "deposit") {
      //handle deopsit insertion
      const transaction = await supabase.from("transactions").insert({
        transaction_type: "CRYPTO",
        amount: dummyData.currency_sent.amount,
        currency: dummyData.currency_received.currency,
        sender_id_id: dummyData.crypto_address.foreign_id,
        sender_description: `Deposited ${dummyData.currency_received.amount_minus_fee}${dummyData.currency_received.currency}`,
        status: "PENDING",
      })
    }
    return Response.json({ message: "OK" }, { status: 200 })
  } else {
    // Signature is invalid, reject the request
    console.log(signature, expectedSignature, requestBody)
    return Response.json({ message: "Invalid Signature" }, { status: 403 })
  }
}

//function getTransctionType(requestBody){}

const dummyData: CallbackData = {
  id: 131001223,
  type: "deposit",
  crypto_address: {
    id: 2563005,
    currency: "ETH",
    address: "0xA64B45063BD8C41538E817E43FEDdf8754B85cDd",
    tag: null,
    foreign_id: "0f5d546a-dd80-5406-a005-a4f3061b9fb4",
  },
  currency_sent: {
    currency: "ETH",
    amount: "0.02000000",
  },
  currency_received: {
    currency: "ETH",
    amount: "0.02000000",
    amount_minus_fee: "0.01979576",
  },
  transactions: [
    {
      id: 1213424,
      currency: "ETH",
      transaction_type: "blockchain",
      type: "deposit",
      address: "0xA64B45063BD8C41538E817E43FEDdf8754B85cDd",
      tag: null,
      amount: "0.02000000",
      txid: "0x054d94346ff31002b27007f8f0623702aa46a219fe7ac990816568a5a0c5361f",
      riskscore: null,
      confirmations: "10",
    },
  ],
  fees: [
    {
      type: "fee_crypto_deposit",
      currency: "ETH",
      amount: "0.00016000",
    },
    {
      type: "transfer",
      currency: "ETH",
      amount: "0.00004424",
    },
  ],
  error: "",
  status: "confirmed",
}
