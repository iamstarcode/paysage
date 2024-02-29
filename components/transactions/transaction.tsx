"use client"

import { useRouter } from "next/navigation"
import { ArrowDown, ArrowUp, X } from "lucide-react"

import { useCurrencies, useGetFiatTransfer, useUser } from "@/hooks/supabase"
import { Button } from "@/components/ui/button"

export default function Transaction({
  transaction_id,
}: {
  transaction_id?: number
}) {
  const router = useRouter()
  const { transfer } = useGetFiatTransfer(transaction_id!)
  const { data: currencies } = useCurrencies()
  const { user } = useUser()

  function debitOrCredit() {
    if (transfer?.fiat_transfers[0].amount! > 0) {
      return 1
      //credit
    }
    //debit
    return -1
  }

  console.log(transfer)
  return (
    <div className="flex items-center z-50">
      <div className="mx-4 md:mx-auto bg-gray-100 border rounded-lg border-gray-200 w-full md:max-w-lg md:mt-auto shadow-lg dark:border-gray-800 dark:bg-gray-950">
        <div className="grid gap-4 p-6">
          <div className="inline-flex justify-between items-center">
            <h1 className="font-semibold text-2xl">Transaction Details</h1>

            <X
              onClick={() => router.back()}
              className="w-4 h-4 cursor-pointer"
              color="#5c5757"
            />
          </div>

          <div className="grid gap-1.5 text-sm">
            <div className="flex items-center gap-1.5">
              {debitOrCredit() > 0 ? (
                <ArrowUp className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDown className="h-4 w-4 text-red-500" />
              )}

              <span className="font-medium">
                {debitOrCredit() > 0 ? "+" : "-"}
                {
                  currencies?.find(
                    (c) => c.id === parseInt(transfer?.currency!)
                  )?.currency_sign
                }
                {transfer?.amount}
              </span>
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
          <Button>Raise A Dispute</Button>
        </div>
      </div>
    </div>
  )
}
