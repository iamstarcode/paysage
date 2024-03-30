import { generateSignature } from "@/utils/helpers"

export async function POST(req: Request) {
  const data = await req.json()

  const requestBody = JSON.stringify(data)
  const apiURL =
    process.env.NODE_ENV == "development"
      ? process.env.COINPAID_DEV_URL
      : process.env.COINPAID_URL

  /*   const res = await fetch(`${apiURL}/addresses/take`, {
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
  }) */
  // const address = await res.json()
  //console.log(currencies, "curr")
  return Response.json({
    data: {
      id: 1,
      currency: "BTC",
      //"convert_to": "EUR",
      address: "2N7tjZgyJWMkDZMyx4Ffm4W7igVXSG6DiL8",
      //"tag": tag-123,
      foreign_id: "0f5d546a-dd80-5406-a005-a4f3061b9fb",
    },
  })
}
