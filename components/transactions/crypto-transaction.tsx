import { useEffect, useState } from "react"
import { CryptoDepositType } from "@/types"
import { shortenAddress } from "@/utils/helpers"
import { Copy } from "lucide-react"

import { useCryptoTransaction } from "@/hooks/supabase"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import DebitCredit from "./debit-credit"
import KeyValuePair from "./key-value-pair"

export default function CrptionTransaction({ id }: { id: number }) {
  const { cryptoTransaction, isCryptoTransactionLoading } =
    useCryptoTransaction(id)

  const [txn, setTxn] = useState<CryptoDepositType | null>()

  useEffect(() => {
    async function getTxn() {
      const res = await fetch(`/api/transaction-info`, {
        method: "POST",
        body: JSON.stringify({
          //id: cryptoTransaction?.crypto_transactions?.foreign_transaction_id!,
          id: "131001223",
        }),
      })

      const data = await res.json()
      //console.log(data, "wskwksmwkmk")
      setTxn(data)
    }

    getTxn()
  }, [cryptoTransaction?.crypto_transactions?.foreign_transaction_id])
  console.log(txn!, "ddddd")

  if (isCryptoTransactionLoading) return
  return (
    <>
      {txn && (
        <div className="grid gap-1 md:gap-2">
          <DebitCredit
            amount={cryptoTransaction?.amount!}
            currecny={cryptoTransaction?.currency!}
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
        </div>
      )}
    </>
  )
}
