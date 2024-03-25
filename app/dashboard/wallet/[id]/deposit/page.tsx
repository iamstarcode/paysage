import RouteModal from "@/components/route-modal"

function Page({ params }: { params: { id: number } }) {
  //console.log(params)
  return (
    <RouteModal>
      <p>add deposit for wallet with id {params.id}</p>
    </RouteModal>
  )
}

export default Page
