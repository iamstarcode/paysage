"use client"

import { useEffect } from "react"
import { Loader2, User2 } from "lucide-react"

import { useCurrencies } from "@/hooks/api"
import { useDepositAdress } from "@/hooks/supabase"

import DepositCrypto from "../deposit/deposit-crypto"
import DepositFiat from "../deposit/deposit-fiat"

function Deposit({ currency }: { id: number; currency: string }) {
  const { currencies, isCurrenciesLoading, currencyError } = useCurrencies({
    method: "POST",
    body: JSON.stringify({ visible: true }),
  })

  // const { depositAdress, isDepositAdressLoading } = useDepositAdress(currency)

  /*   useEffect(() => {
    // if (!depositAdress) setGenerateWallet(true)
  }, [depositAdress]) */

  if (isCurrenciesLoading)
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
    <>
      {foundCurrency.type == "crypto" ? (
        <DepositCrypto currency={foundCurrency} />
      ) : (
        <DepositFiat currency={foundCurrency} />
      )}
    </>
  )
}

export default Deposit
