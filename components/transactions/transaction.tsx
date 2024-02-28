/**
 * v0 by Vercel.
 * @see https://v0.dev/t/dB6GF9F4L06
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { ArrowDown, ArrowUp } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Transaction() {
  return (
    <div className="flex items-center  py-12 md:py-24 z-50">
      <div className="mx-4 md:mx-auto bg-gray-100 border rounded-lg border-gray-200 w-full max-w-2xl shadow-lg dark:border-gray-800 dark:bg-gray-950">
        <div className="grid gap-4 p-6">
          <h1 className="font-semibold text-2xl">Transaction Details</h1>
          <div className="grid gap-1.5 text-sm">
            <div className="flex items-center gap-1.5">
              <ArrowUp className="h-4 w-4 text-green-500" />
              <span className="font-medium">+ $500.00</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ArrowDown className="h-4 w-4 text-red-500" />
              <span className="font-medium">- $500.00</span>
            </div>
          </div>
          <div className="grid gap-2 text-sm">
            <div className="flex items-center">
              <div className="font-medium">Sender</div>
              <div className="ml-auto text-gray-500 dark:text-gray-400">
                Alice Johnson
              </div>
            </div>
            <div className="flex items-center">
              <div className="font-medium">Recipient</div>
              <div className="ml-auto text-gray-500 dark:text-gray-400">
                Bob Smith
              </div>
            </div>
            <div className="flex items-center">
              <div className="font-medium">Amount</div>
              <div className="ml-auto">$500.00</div>
            </div>
            <div className="flex items-center">
              <div className="font-medium">Date</div>
              <div className="ml-auto">2022-06-30 15:23:45</div>
            </div>
            <div className="flex items-center">
              <div className="font-medium">Transaction ID</div>
              <div className="ml-auto">1234567890</div>
            </div>
          </div>
          <Button>View Details</Button>
        </div>
      </div>
    </div>
  )
}
