//import crypto from "crypto"
import { generateSignature } from "@/utils/helpers"

export async function POST() {
  const requestBody = JSON.stringify({ visible: true })
  const apiURL =
    process.env.NODE_ENV == "development"
      ? process.env.COINPAID_DEV_URL
      : process.env.COINPAID_URL

  //console.log(apiURL, "ccnfcfncjn")
  const res = await fetch(`${apiURL}/currencies/list`, {
    method: "POST",
    body: requestBody,
    headers: {
      "Content-Type": "application/json",
      "X-Processing-Key": process.env.COINPAID_KEY!,
      "X-Processing-Signature": generateSignature(
        requestBody,
        process.env.COINPAID_SECRET_KEY!
      ),
    },
  })
  const currencies = await res.json()
  return Response.json({ data: currencies.data })
}
