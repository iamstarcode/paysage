"use client"

import { createClient } from "@/utils/supabase/client"
import {
  useInsertMutation,
  useUpdateMutation,
} from "@supabase-cache-helpers/postgrest-swr"

import { useWallet } from "@/hooks/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function Balance() {
  const { data } = useWallet()

  return (
    <>
      {data?.map(({ balance, currencies }) => (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Account Balance
            </CardTitle>
            {currencies?.currency_sign}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {currencies?.currency_sign}
              {balance}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              You're doing great! Keep it up.
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

export default Balance
