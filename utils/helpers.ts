import crypto from "crypto"
import { FormState } from "@/types"

export const isCurrencyPresent = (wallets: any, id: any) => {
  return wallets.some(
    (item: { currencies: { id: any } }) => item.currencies.id === id
  )
}

export const selectBalanceByCurrency = (wallet: any, id: any) => {
  return wallet.find(
    (item: { currencies: { id: any } }) => item.currencies.id === id
  )
}

export function generateReferenceNumber(length = 16) {
  // Define allowed characters
  const allowedChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

  // Generate random string
  let referenceNumber = ""
  for (let i = 0; i < length; i++) {
    referenceNumber += allowedChars.charAt(
      Math.floor(Math.random() * allowedChars.length)
    )
  }

  return referenceNumber
}

export function generateTransactionReference(prefix: string): string {
  // Generate a random number (between 10000 and 99999)
  const randomNumber = Math.floor(Math.random() * 90000) + 10000

  // Get the current date and time
  const now = new Date()

  // Format the date and time components
  const year = now.getFullYear().toString().substring(-2)
  const month = ("0" + (now.getMonth() + 1)).slice(-2)
  const day = ("0" + now.getDate()).slice(-2)
  const hours = ("0" + now.getHours()).slice(-2)
  const minutes = ("0" + now.getMinutes()).slice(-2)
  const seconds = ("0" + now.getSeconds()).slice(-2)

  const referenceNumber = `${prefix}${year}${month}${day}${hours}${minutes}-${seconds}${randomNumber}`

  return referenceNumber
}

export function generateSignature(requestBody: any, apiSecret: any) {
  const signature = crypto
    .createHmac("sha512", process.env.COINPAID_SECRET_KEY!)
    .update(requestBody)
    .digest("hex")

  return signature
}

export function handleValidationError(result: any) {
  let errorMsg: string[] = []

  result.error.issues.forEach((issue: any) => {
    errorMsg.push(issue.path[0] + ": " + issue.message)
  })

  return {
    errors: errorMsg,
    message: "Error: Please Check Your Input!",
    type: "ValidationError",
  } as FormState
}

export const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/"
  // Make sure to include `https://` when not localhost.
  url = url.includes("http") ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === "/" ? url : `${url}/`
  return url
}
