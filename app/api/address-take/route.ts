import { generateSignature } from "@/utils/helpers"

export async function POST(req: Request) {
  const data = await req.json()

  const requestBody = JSON.stringify(data)
  const apiURL =
    process.env.NODE_ENV == "development"
      ? process.env.COINPAID_DEV_URL
      : process.env.COINPAID_URL

  const res = await fetch(`${apiURL}/addresses/take`, {
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
  const address = await res.json()
  //console.log(requestBody, address, "add")
  return Response.json(address)
}
