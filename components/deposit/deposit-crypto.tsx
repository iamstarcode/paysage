import { useEffect, useState } from "react"
import { CurrencyType } from "@/types"
import { createClient } from "@/utils/supabase/client"
import { Copy } from "lucide-react"

import { Tables } from "@/types/g-supabase"
import { useWalletByCurreny } from "@/hooks/supabase"
import { Input } from "@/components/ui/input"

import { Label } from "../ui/label"

export default function DepositCrypto({
  currency,
  //wallet,
}: {
  currency: CurrencyType
  wallet?: Tables<"wallets"> | null | undefined
}) {
  const supabase = createClient()
  const [address, setAddress] = useState<string | undefined>()

  useEffect(() => {
    async function generateWallet() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const { data: depositAddress } = await supabase
        .from("deposit_addresses")
        .select("*")
        .eq("currency", currency.currency)
        .is("convert_to", null)
        .single()

      if (depositAddress) {
        setAddress(depositAddress.address)

        return
      } else {
        console.log("dont here")
        const res = await fetch("/api/address-take", {
          method: "POST",
          body: JSON.stringify({
            currency: currency.currency,
            foreign_id: user?.id,
          }),
        })

        const takenAddress = await res.json()

        await supabase.from("deposit_addresses").insert({
          currency: currency.currency!,
          user_id: user?.id!,
          address: takenAddress.data.address,
          convert_to: null,
        })
        setAddress(takenAddress.data.address)
      }
    }

    generateWallet()
  }, [currency.currency, supabase])

  // if (isWalletLoading) return <p>Generating wallet</p>

  return (
    <div>
      <Label>{`Your ${currency.currency} deposit Address`}</Label>
      <div className="relative w-full">
        <Input
          disabled
          className="w-full border-[1px] border-gray-300 px-4 py-6"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="absolute inset-y-0 right-0 mr-3  flex items-center  pointer-events-none">
          <Copy className="" />
        </div>
      </div>
    </div>
  )
}
