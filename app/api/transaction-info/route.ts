import { join } from "path"
import { generateSignature } from "@/utils/helpers"
import axios from "axios"

export async function POST(req: Request) {
  const data = await req.json()
  const requestBody = JSON.stringify(data)
  const apiURL =
    process.env.NODE_ENV == "development"
      ? process.env.COINPAID_DEV_URL
      : process.env.COINPAID_URL

  try {
    const response = await axios.get(`${apiURL}/transactions/info`, {
      data: requestBody,
      headers: {
        "Content-Type": "application/json",
        "X-Processing-Key": process.env.COINPAID_KEY!,
        "X-Processing-Signature": generateSignature(
          requestBody,
          process.env.COINPAID_SECRET_KEY!
        ),
      },
    })
    //console.log(response.data)
    return Response.json(response.data)
  } catch (error: any) {
    console.error(error.response)
    return Response.json(
      { ...error.response.data },
      { status: error.response.status }
    )
  }
}
