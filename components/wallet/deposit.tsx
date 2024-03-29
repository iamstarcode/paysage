"use client"

import { useEffect, useState } from "react"
import { CurrencyType } from "@/types"
import { Copy, Loader2, User2 } from "lucide-react"

import { useCurrencies } from "@/hooks/api"
import { useDepositAdress, useWalletByCurreny } from "@/hooks/supabase"

import { Input } from "../ui/input"

function Deposit({ id, currency }: { id: number; currency: string }) {
  const [generateWallet, setGenerateWallet] = useState(false)
  const { currencies, isCurrenciesLoading, currencyError } = useCurrencies({
    method: "POST",
    body: JSON.stringify({ visible: true }),
  })
  const { wallet, isWalletLoading, walletError } = useWalletByCurreny(currency)

  const { depositAdress, depositAddressError, isDepositAdressLoading } =
    useDepositAdress(currency)

  useEffect(() => {
    if (!depositAdress) setGenerateWallet(true)
  }, [depositAdress])

  if (isWalletLoading || isDepositAdressLoading || isCurrenciesLoading)
    return (
      <div className="flex justify-center">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    )

  if (currencyError) return <p>An Error occured</p>
  //console.log(currencies, "jbhfbhrbh")

  const currencyAvailable = currencies?.find(
    (item: { currency: string }) => item.currency == currency
  )

  if (!currencyAvailable)
    return <p>Currently not accepting {currency} deposits</p>

  console.log(depositAdress)

  //if (!curr) return <p>Something went wrong</p>
  // const wallet = wallets.find((item: { id: number }) => item.id === +id)

  // console.log(curr, depositAdresses)
  return (
    <div className="flex flex-col space-y-4 items-center justify-center">
      <User2 className="h-8 w-8" />
      <p className="text-3xl text-center font-bold">Your {currency} address </p>
      <p className="text-sm text-slate-400 text-center">
        You can use this address in order to accept deposits from both external
        and internal addresses.
      </p>

      {generateWallet ? (
        <p>genrate walet</p>
      ) : (
        <div>
          <div className="relative w-full">
            <Input
              disabled
              className="border-[1px] border-gray-300 px-4 py-6"
            />
            <div className="absolute inset-y-0 right-0 mr-3  flex items-center  pointer-events-none">
              <Copy className="" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Deposit
