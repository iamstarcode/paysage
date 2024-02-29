import Transaction from "@/components/transactions/transaction"

function Page({ params }: { params: { id: number } }) {
  return <Transaction transaction_id={params.id} />
}

export default Transaction
