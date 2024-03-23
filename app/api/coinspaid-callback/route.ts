import crypto from "crypto" // For signature verification (optional)
import { NextApiRequest, NextApiResponse } from "next"

const COINPAID_SECRET_KEY = process.env.COINPAID_SECRET_KEY // Replace with your secret

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { ipn_mode, ...data } = req.body // Destructure incoming data

  // Basic validation (optional)
  if (ipn_mode !== "hmac") {
    return res.status(400).json({ message: "Invalid IPN mode" })
  }

  // Signature verification (optional, recommended for security)
  if (COINPAID_SECRET_KEY) {
    const hmac = crypto.createHmac("sha256", COINPAID_SECRET_KEY)
    const calculatedSignature = hmac.update(JSON.stringify(data)).digest("hex")

    if (calculatedSignature !== req.headers["hmac"]) {
      return res.status(403).json({ message: "Invalid signature" })
    }
  }

  // Process CoinPayments notification data (e.g., transaction status, etc.)
  console.log("CoinPayments notification:", data)

  // Handle the notification data as needed in your application logic
  // (e.g., update order status, send email notifications, etc.)

  res.status(200).json({ message: "OK" })
}
