"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { User } from "@supabase/supabase-js"
import { ArrowDown, ArrowUp, X } from "lucide-react"

import {
  useCurrencies,
  useGetFiatTransaction,
  useTransactions,
} from "@/hooks/supabase"
import { Button } from "@/components/ui/button"

import RouteModal from "../route-modal"

export default function Transaction({
  transaction_id,
}: {
  transaction_id?: number
}) {
  const router = useRouter()
  const { fiatTransaction } = useGetFiatTransaction(transaction_id!)

  const {} = useTransactions()

  const supabase = createClient()

  //const { data: currencies } = useCurrencies()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUser(user)
    }
    getUser()
  }, [supabase])
  function debitOrCredit() {
    if (fiatTransaction?.fiat_transactions[0].amount! > 0) {
      return 1
      //credit
    }
    //debit
    return -1
  }

  return (
    <div className="grid gap-4 p-6">
      <div className="grid gap-1.5 text-sm">
        <div className="flex items-center gap-1.5">
          {debitOrCredit() > 0 ? (
            <ArrowUp className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDown className="h-4 w-4 text-red-500" />
          )}

          {/* <span className="font-medium">
                {debitOrCredit() > 0 ? "+" : "-"}
                {
                  currencies?.find(
                    (c) => c.id === parseInt(transfer?.currency!)
                  )?.currency_sign
                }
                {transfer?.amount}
              </span> */}
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
  )
}
