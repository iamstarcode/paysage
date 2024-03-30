import { Copy } from "lucide-react"

import { Input } from "@/components/ui/input"

export default function DepositFiat() {
  return (
    <div>
      <div className="relative w-full">
        <Input disabled className="border-[1px] border-gray-300 px-4 py-6" />
        <div className="absolute inset-y-0 right-0 mr-3  flex items-center  pointer-events-none">
          <Copy className="" />
        </div>
      </div>
    </div>
  )
}
