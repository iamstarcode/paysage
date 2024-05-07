import { Suspense } from "react"
import { getURL } from "@/utils/helpers"

import { Button } from "@/components/ui/button"

import TransactionSkeleton from "../skeletons/transaction"
import CrptionTransaction from "./crypto-transaction"

export default async function Transaction({
  transaction_id,
  searchParams,
}: {
  transaction_id?: number
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 10000)
  })
  if (searchParams.type == "crypto_transactions") {
    return <CrptionTransaction id={transaction_id!} />
  } else {
    return <p>Transction not found</p>
  }
}
