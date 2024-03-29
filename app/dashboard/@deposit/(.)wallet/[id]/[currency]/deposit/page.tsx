import RouteModal from "@/components/route-modal"
import Deposit from "@/components/wallet/deposit"

export default function Page({
  params,
}: {
  params: { id: number; currency: string }
}) {
  return (
    <RouteModal>
      <Deposit id={params.id} currency={params.currency} />
    </RouteModal>
  )
}
