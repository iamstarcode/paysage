import RouteModal from "@/components/route-modal"
import Transaction from "@/components/transactions/transaction"

export default function Page({ params }: { params: { id: number } }) {
  return (
    <RouteModal>
      <Transaction transaction_id={params.id} />
    </RouteModal>
  )
}
