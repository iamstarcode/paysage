import Transaction from "@/components/transactions/transaction"

export default function Page() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="rounded-md w-full md:max-w-lg">
        <Transaction />
      </div>
    </div>
  )
}
