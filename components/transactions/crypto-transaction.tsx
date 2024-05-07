import { Suspense, useEffect, useState } from "react"
import { CryptoDepositType } from "@/types"
import { getURL, shortenAddress } from "@/utils/helpers"
import { Copy } from "lucide-react"

import { useCryptoTransaction } from "@/hooks/supabase"

import TransactionSkeleton from "../skeletons/transaction"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import DebitCredit from "./debit-credit"
import KeyValuePair from "./key-value-pair"

export default async function CrptionTransaction({ id }: { id: number }) {
  const res = await fetch(getURL() + `/api/transaction-info`, {
    method: "POST",
    body: JSON.stringify({
      id: 131005996,
    }),
  })

  const txn: CryptoDepositType = await res.json()

  if (txn.errors) return <p>No transaction found.</p>

  return (
    <>
      <div className="grid gap-1 md:gap-2">
        <DebitCredit
          amount={+txn.currency_received?.amount!}
          currecny={txn.currency_received?.currency!}
        />
        <Card>
          <CardHeader>
            <CardDescription>Crypto Address</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-md">
              <div className="flex items-center">
                <div className="font-medium">Address</div>
                <div className="ml-auto inline-flex items-center text-gray-500 dark:text-gray-400">
                  <h2 className="mr-2">
                    {shortenAddress(txn?.crypto_address.address!)}
                  </h2>
                  <Copy className="w-4 h-4" />
                </div>
              </div>
              <KeyValuePair
                kee="Currency"
                value={txn.crypto_address.currency!}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Currency Recieved</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-md">
              <KeyValuePair
                kee="Amount"
                value={txn.currency_received.amount!}
              />
              <KeyValuePair
                kee="Amount Minus Fee"
                value={txn.currency_received.amount_minus_fee!}
              />
              <KeyValuePair
                kee="Currency"
                value={txn.currency_received.currency!}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Currency Sent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-md">
              <KeyValuePair kee="Amount" value={txn.currency_sent.amount!} />

              <KeyValuePair
                kee="Currency"
                value={txn.currency_sent.currency!}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardDescription>Fees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-md">
              <KeyValuePair
                kee="Crypto Deposit Fee"
                value={txn.fees[0].amount! + txn.fees[0].currency}
              />

              <KeyValuePair
                kee="Transfer Fee"
                value={txn.fees[1].amount! + txn.fees[1].currency}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
