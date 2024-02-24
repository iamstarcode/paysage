import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/server"

import { Tables } from "@/types/g-supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Transfer from "@/components/transfer"
import Balance from "@/components/wallet/balance"
import RecentTransactions from "@/components/wallet/recent-transactions"

export default async function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col-reverse md:flex-row md:justify-between">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full md:max-w-fit">
          <Balance />
        </div>

        <div className="flex gap-2">
          <Button size="sm">Add funds</Button>

          <Button size="sm" variant="outline">
            Withdraw
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="h-2 flex-1 min-w-0" />
        <div className="text-xs shrink-0">30% of $5,000 spending limit</div>
      </div>
      <div className="grid md:grid-cols-2 md:gap-8">
        <Transfer />
        <RecentTransactions />
      </div>
    </div>
  )
}
