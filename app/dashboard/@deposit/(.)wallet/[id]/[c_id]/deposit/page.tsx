import RouteModal from "@/components/route-modal"
import Deposit from "@/components/wallet/deposit"

export default function Page({
  params,
}: {
  params: { id: number; c_id: number }
}) {
  return (
    <RouteModal>
      <Deposit id={params.id} currencyId={params.c_id} />
    </RouteModal>
  )
}
