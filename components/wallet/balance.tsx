import Link from "next/link"
import { createClient } from "@/utils/supabase/server"
import { PlusCircle } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

async function Balance() {
  /*   await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 3000)
  }) */

  const supabase = createClient()
  const { data: wallets } = await supabase.from("wallets").select("*")
  return (
    <>
      {wallets?.map(({ balance, id, currency_id }) => (
        <Card key={id}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              <PlusCircle />
            </CardTitle>
            {" Account Balance/CODE"}
          </CardHeader>
          <CardContent>
            <div className="bg-black p-4 rounded-lg text-white w-full flex flex-row justify-between items-center mt-5">
              <Link href={`/dashboard/wallet/${id}/${currency_id}/deposit`}>
                <div className="flex flex-col justify-center items-center">
                  <PlusCircle />
                  <p className="text-sm">Recieve</p>
                </div>
              </Link>

              <div className="flex flex-col justify-center items-center">
                <PlusCircle />
                <p className="text-sm">Send</p>
              </div>

              <div className="flex flex-col justify-center items-center">
                <PlusCircle />
                <p className="text-sm">Exchange</p>
              </div>
              {/*  <Button asChild variant="outline">
                  <Link href={`/dashboard/wallet/${id}/deposit`}>Deposit</Link>
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronDown className="h-4 w-4" />
                </Button> */}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

export default Balance
