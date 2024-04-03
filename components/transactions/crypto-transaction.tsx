import { useEffect, useState } from "react"

import { useCryptoTransaction } from "@/hooks/supabase"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card"
import DebitCredit from "./debit-credit"

export default function CrptionTransaction({ id }: { id: number }) {
  const { cryptoTransaction, isCryptoTransactionLoading } =
    useCryptoTransaction(id)

  const [txn, setTxn] = useState({})

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
      console.log(data, "wskwksmwkmk")
      setTxn(data)
    }

    getTxn()
  }, [cryptoTransaction?.crypto_transactions?.foreign_transaction_id])
  console.log(txn, "ddddd")

  return (
    <div>
      <DebitCredit
        amount={cryptoTransaction?.amount!}
        currecny={cryptoTransaction?.currency!}
      />
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Your account details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Address</div>
            <div className="text-right">0x4be...a5f</div>
            <div>Balance</div>
            <div className="text-right">12.3456 ETH</div>
            <div>Transactions</div>
            <div className="text-right">5</div>
            <div>Nonce</div>
            <div className="text-right">2</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
