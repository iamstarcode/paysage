import { createHmac, timingSafeEqual } from "crypto" // For signature verification (optional)

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
    console.log(signature, expectedSignature, requestBody, "success")

    //const transactionType = getTransctionType(requestBody)

    return Response.json({ message: "OK" }, { status: 200 })
  } else {
    // Signature is invalid, reject the request
    console.log(signature, expectedSignature, requestBody)
    return Response.json({ message: "Invalid Signature" }, { status: 403 })
  }
}

//function getTransctionType(requestBody){}
