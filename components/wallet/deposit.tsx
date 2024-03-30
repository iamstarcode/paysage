"use client"

import { useEffect, useState } from "react"
import { CurrencyType } from "@/types"
import { createClient } from "@/utils/supabase/client"
import { Copy, Loader2, User2 } from "lucide-react"

import { useCurrencies } from "@/hooks/api"
import { useDepositAdress, useWalletByCurreny } from "@/hooks/supabase"

import DepositFiat from "../deposit/deposit-crypto"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

function Deposit({ id, currency }: { id: number; currency: string }) {
  const supabase = createClient()
  const [generateWallet, setGenerateWallet] = useState(false)
  const { currencies, isCurrenciesLoading, currencyError } = useCurrencies({
    method: "POST",
    body: JSON.stringify({ visible: true }),
  })
  //const { wallet, isWalletLoading, walletError } = useWalletByCurreny(currency)

  const { depositAdress, depositAddressError, isDepositAdressLoading } =
    useDepositAdress(currency)

  useEffect(() => {
    if (!depositAdress) setGenerateWallet(true)
  }, [depositAdress])

  if (isDepositAdressLoading || isCurrenciesLoading)
    return (
      <div className="flex justify-center">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    )

  if (currencyError) return <p>An Error Occured</p>

  const foundCurrency = currencies?.find(
    (item: { currency: string }) => item.currency == currency
  )

  if (!foundCurrency) return <p>Currently not accepting {currency} deposits</p>

  //console.log(foundCurrency)

  //TODO if its fiat, we provide options with deposite using more than one crypto type
  //if cryto, just one address is enough
  //exmple ETH to EUR, BTC to Euro
  /*   async function addresseTake() {
    if (wallet) {
      //genrate wallet with this currency
      const {
        data: { user },
      } = await supabase.auth.getUser()
      const address = fetch("/generate-wallet", {
        method: "POST",
        body: JSON.stringify({ currency, foreign_id: user?.id }),
      })
    }
  } */

  return (
    <div className="flex flex-col space-y-4 justify-center">
      <User2 className="h-8 w-8 mx-auto" />
      <p className="text-3xl text-center font-bold">Your {currency} address </p>
      <p className="text-sm text-slate-400 text-center">
        You can use this address in order to accept deposits from both external
        and internal addresses.
      </p>

      {foundCurrency.type == "crypto" ? (
        <DepositFiat currency={foundCurrency} /* wallet={wallet} */ />
      ) : (
        <div>
          <p>in the workss</p>
        </div>
      )}
    </div>
  )
}

export default Deposit
