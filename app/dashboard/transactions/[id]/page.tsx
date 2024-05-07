import { Suspense } from "react"

import RouteModal from "@/components/route-modal"
import TransactionSkeleton from "@/components/skeletons/transaction"
import Transaction from "@/components/transactions/transaction"

function Page({
  params,
  searchParams,
}: {
  params: { id: number }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <RouteModal>
      <Suspense fallback={<TransactionSkeleton />}>
        <Transaction transaction_id={params.id} searchParams={searchParams} />
      </Suspense>
    </RouteModal>
  )
}

export default Page
