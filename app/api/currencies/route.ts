import { generateSignature } from "@/utils/helpers"

export async function POST(req: Request) {
  const data = await req.json()

  const requestBody = JSON.stringify(data)
  const apiURL =
    process.env.NODE_ENV == "development"
      ? process.env.COINPAID_DEV_URL
      : process.env.COINPAID_URL

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

  if (res.ok) {
    const currencies = await res.json()
    return Response.json({ ...currencies })
  }

  console.log(res, "ressxededede")

  return Response.json({ msg: "error occured" })
  //console.log(currencies, "nrjfrjnfjrfnj")
}
