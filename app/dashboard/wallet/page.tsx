import { Suspense } from "react"
import { createClient } from "@/utils/supabase/server"

import BalanceSkeleton from "@/components/skeletons/balance"
import Wallets from "@/components/wallet/wallets"

export default async function Page() {
  const supabase = createClient()

  const { data: wallets } = await supabase.from("wallets").select("*")

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 5000)
  })
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-bold">Wallets</p>
        {/*   <DrawerDemo /> */}
        {/*  Might remove this, as it gets currency, which is overkill */}
      </div>
      <div className="flex flex-col-reverse md:flex-row md:justify-between">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full md:min-w-24">
          <Suspense
            fallback={Array.from({ length: 4 }).map((_, index) => (
              <BalanceSkeleton key={index} />
            ))}
          >
            <Wallets wallets={wallets!} />
          </Suspense>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-2 flex-1 min-w-0" />
        <div className="text-xs shrink-0">30% of $5,000 spending limit</div>
      </div>

      {/*  <Suspense fallback={<CurrencySkeleton />}>
        <Currencies />
      </Suspense> */}
      <div className="grid md:grid-cols-2 md:gap-8">
        {/*  <Transfer />
        <RecentTransactions /> */}
      </div>
    </div>
  )
}
