import { ArrowDown, ArrowUp } from "lucide-react"

export default function DebitCredit({
  amount,
  currecny,
}: {
  amount: number
  currecny: string
}) {
  return (
    <div className="grid gap-1.5 text-sm">
      <div className="flex items-center gap-1.5">
        {amount > 0 ? (
          <ArrowDown className="h-4 w-4 text-blue-500" />
        ) : (
          <ArrowUp className="h-4 w-4 text-green-500" />
        )}

        {
          <span className="font-medium">
            {amount > 0 ? "+" : "-"}
            {amount}
            {currecny}
          </span>
        }
      </div>
    </div>
  )
}
