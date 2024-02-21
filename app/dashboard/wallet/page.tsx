import { getUserQuery } from "@/utils/supabase/queries"
import { createClient } from "@/utils/supabase/server"

import { Tables } from "@/types/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Transfer from "@/components/transfer"

async function getWallet() {
  const supabase = createClient()
  const { data: wallets } = await supabase.from("wallets").select("*")
  const user = await getUserQuery()

  return user
}
export default async function Page() {
  const { data } = await getUserQuery()
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col-reverse md:flex-row md:justify-between">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full md:max-w-fit">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Account Balance
              </CardTitle>
              $
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$10,000.00</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                You're doing great! Keep it up.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Account Balance
              </CardTitle>
              &#x20a6;
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"> &#x20a6;10.00</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                You're doing great! Keep it up.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Account Balance
              </CardTitle>
              &#x20a6;
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"> &#x20a6;10.00</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                You're doing great! Keep it up.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Account Balance
              </CardTitle>
              &#x20a6;
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold"> &#x20a6;10.00</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                You're doing great! Keep it up.
              </p>
            </CardContent>
          </Card>
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
      <Card className="border">
        <CardContent className="p-4">
          <div className="grid items-start gap-1 text-sm">
            <div className="font-semibold">Last transaction</div>
            <div className="text-gray-500 dark:text-gray-400">
              Coffee at Acme Cafe
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent transactions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-t">
            <div className="grid grid-cols-[1fr_1fr_1fr] items-center px-4 py-3 text-sm">
              <div>
                <div className="font-semibold">Uber</div>
                <div className="text-gray-500 dark:text-gray-400">Ride</div>
              </div>
              <div className="text-center">$25.00</div>
              <div className="text-right">2m ago</div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-800" />
            <div className="grid grid-cols-[1fr_1fr_1fr] items-center px-4 py-3 text-sm">
              <div>
                <div className="font-semibold">Acme Inc</div>
                <div className="text-gray-500 dark:text-gray-400">Coffee</div>
              </div>
              <div className="text-center">$10.00</div>
              <div className="text-right">1h ago</div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-800" />
            <div className="grid grid-cols-[1fr_1fr_1fr] items-center px-4 py-3 text-sm">
              <div>
                <div className="font-semibold">Amazon</div>
                <div className="text-gray-500 dark:text-gray-400">
                  Headphones
                </div>
              </div>
              <div className="text-center">$99.00</div>
              <div className="text-right">1d ago</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Transfer />
    </div>
  )
}
