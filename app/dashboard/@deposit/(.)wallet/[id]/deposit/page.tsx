import RouteModal from "@/components/route-modal"
import Transaction from "@/components/transactions/transaction"

export default function Page({ params }: { params: { id: number } }) {
  return (
    <RouteModal>
      <p>This is an intercetd route for wallet/[id]/deposit</p>
    </RouteModal>
  )
}
