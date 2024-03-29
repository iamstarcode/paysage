"use client"

import { useEffect, useState } from "react"
import { CurrencyType } from "@/types"
import { Image, Loader2, User2 } from "lucide-react"

import { useDepositAdress, useWallet } from "@/hooks/supabase"

function Deposit({ id, currency }: { id: number; currency: string }) {
  //const [currencies, setCurrencies] = useState<CurrencyType[] | null>()
  const [_currency, setCurrency] = useState<CurrencyType>()
  const { data: wallets } = useWallet()
  const { data: depositAdresses } = useDepositAdress()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/currencies", { method: "POST" })
      const data = await response.json()

      const _c = data.data.find((item: { id: number }) => item.id === +currency)

      setCurrency(_c)
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log(currency)
  if (!wallets || !currency) return <Loader2 />

  //console.log(currency, wallet, "hhhhhhhhhhhhhhhhh")
  const wallet = wallets.find((item: { id: number }) => item.id === +id)

  console.log(wallet, currency, depositAdresses)
  return (
    <div className="flex flex-col space-y-4 items-center justify-center">
      <User2 className="h-8 w-8" />
      <p>Your {currency} address </p>
    </div>
  )
}

export default Deposit
