import { createHmac, timingSafeEqual } from "crypto" // For signature verification (optional)

const COINPAID_SECRET_KEY = process.env.COINPAID_SECRET_KEY! // Replace with your secret

export async function POST(request: Request) {
  const { headers, body } = request // Destructure incoming data

  const {
    "x-processing-key": publicKey,
    "x-processing-signature": signature,
  }: any = headers

  // Verify the signature
  const expectedSignature = createHmac("sha512", COINPAID_SECRET_KEY)
    .update(JSON.stringify(body))
    .digest("hex")
  const isSignatureValid = timingSafeEqual(
    Buffer.from(expectedSignature, "hex"),
    Buffer.from(signature, "hex")
  )

  if (!isSignatureValid) {
    return Response.json({ error: "Invalid signature" }, { status: 401 })
  }

  // Process the callback payload
  console.log("CoinsPaid callback received:", body)
  // Process CoinPayments notification data (e.g., transaction status, etc.)
  // console.log("CoinPayments notification:", data)

  // Handle the notification data as needed in your application logic
  // (e.g., update order status, send email notifications, etc.)

  return Response.json({ message: "OK" })
}
