import { CurrencyType } from "@/types"
import { Copy } from "lucide-react"

import { Input } from "@/components/ui/input"

import { Label } from "../ui/label"

export default function DepositFiat({ currency }: { currency: CurrencyType }) {
  return (
    <div>
      <Label>{`Your ${currency.currency} deposit Address`}</Label>
      <div className="relative w-full">
        <Input
          disabled
          className="w-full border-[1px] border-gray-300 px-4 py-6"
        />
        <div className="absolute inset-y-0 right-0 mr-3  flex items-center  pointer-events-none">
          <Copy className="" />
        </div>
      </div>
    </div>
  )
}
