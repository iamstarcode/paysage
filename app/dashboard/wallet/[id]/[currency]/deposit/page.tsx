import RouteModal from "@/components/route-modal"
import Deposit from "@/components/wallet/deposit"

function Page({ params }: { params: { currency: string; id: number } }) {
  //console.log(params)
  return (
    <RouteModal>
      <Deposit id={params.id} currency={params.currency} />
    </RouteModal>
  )
}

export default Page
