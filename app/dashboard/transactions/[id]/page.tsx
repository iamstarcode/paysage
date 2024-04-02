import RouteModal from "@/components/route-modal"
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
      <Transaction transaction_id={params.id} searchParams={searchParams} />
    </RouteModal>
  )
}

export default Page
