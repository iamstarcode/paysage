"use client"

import { createClient } from "@/utils/supabase/client"
import {
  useInsertMutation,
  useUpdateMutation,
} from "@supabase-cache-helpers/postgrest-swr"
import { ChevronDown, ChevronUp } from "lucide-react"

import { useWallet } from "@/hooks/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "../ui/button"

function Balance() {
  const { data } = useWallet()

  // console.log(data)

  return (
    <>
      {data?.map(({ balance, id }) => (
        <Card key={id}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Account Balance
            </CardTitle>
            {"Sign"}
          </CardHeader>
          <CardContent>
            <div className="flex flex-row justify-between items-center mt-5">
              <p className="text-sm font-bold">
                {"Sign"}
                {balance}
              </p>

              <div className="inline-flex space-x-2">
                <Button variant="outline" size="icon">
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

export default Balance
