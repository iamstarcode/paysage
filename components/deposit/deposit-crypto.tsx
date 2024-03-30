import { useEffect, useState } from "react"
import { CurrencyType } from "@/types"
import { createClient } from "@/utils/supabase/client"
import { Copy } from "lucide-react"

import { Tables } from "@/types/g-supabase"
import { useWalletByCurreny } from "@/hooks/supabase"
import { Input } from "@/components/ui/input"

import { Label } from "../ui/label"

export default function DepositFiat({
  currency,
  //wallet,
}: {
  currency: CurrencyType
  wallet?: Tables<"wallets"> | null | undefined
}) {
  const supabase = createClient()
  const [address, setAddress] = useState<string | undefined>()

  const { wallet, isWalletLoading, walletError, mutateWallet } =
    useWalletByCurreny(currency)

  /*  useEffect(() => {
    async function generateWallet() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (wallet == null || wallet == undefined) {
        //we generate address here
        console.log("we generate")
        await supabase.from("deposit_addresses").insert({
          currency: currency.currency!,
          user_id: user?.id!,
          address: "generated-address",
          convert_to: null,
        })
      } else {
        console.log("We have an address")
        const { data } = await supabase
          .from("deposit_addresses")
          .select("address")
          .eq("user_id", user?.id!)
          .single()
        setAddress(data?.address!)
      }
    }

    generateWallet()
  }, [address, currency.currency, supabase, wallet]) */

  useEffect(() => {
    async function generateWallet() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!wallet) {
        const { data } = await supabase
          .from("deposit_addresses")
          .insert({
            currency: currency.currency!,
            user_id: user?.id!,
            address: "generated-address",
            convert_to: null,
          })
          .select("address")
          .single()
        setAddress(data?.address!)
        //await mutateWallet()
      } else {
        console.log("already have an address")
        const { data } = await supabase
          .from("deposit_addresses")
          .select("address")
          .eq("user_id", user?.id!)
          //.eq("convert_to")
          .single()
        setAddress(data?.address!)
      }
    }

    generateWallet()
  }, [currency.currency, supabase, wallet])
  if (isWalletLoading) return <p>Generating wallet</p>

  return (
    <div>
      <Label>{`Your ${currency.currency} deposit Address`}</Label>
      <div className="relative w-full">
        <Input
          disabled
          className="w-full border-[1px] border-gray-300 px-4 py-6"
          value={address}
        />
        <div className="absolute inset-y-0 right-0 mr-3  flex items-center  pointer-events-none">
          <Copy className="" />
        </div>
      </div>
    </div>
  )
}
