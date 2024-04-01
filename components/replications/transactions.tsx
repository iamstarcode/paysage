/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useState } from "react"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js"

import { useTransactions } from "@/hooks/supabase"
import { useToast } from "@/components/ui/use-toast"

function Realtime() {
  const supabase = createClient()
  const { mutate } = useTransactions()
  const { toast } = useToast()

  const handleUpdates = async (
    payload: RealtimePostgresChangesPayload<any>
  ) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    //TODO, maybe to handle only to have the notifaction if the user is for this person
    if (!user) {
      return redirect("/auth/login")
    }

    let message = ""
    if (payload?.new?.receiver_id! == user?.id) {
      message = payload.new.receiver_description
      console.log("you the reciever")
    } else {
      message = payload.new.sender_description
      console.log("you the sender")
    }
    if (payload.eventType == "INSERT") {
      toast({
        description: (
          <div className="flex flex-col">
            <div className="inline-flex items-center">
              <div className="h-8 w-8 bg-black rounded-full"></div>
              <p className="ml-4">{message}</p>
            </div>
          </div>
        ),
      })
    } else if (payload.eventType == "UPDATE") {
      toast({
        description: (
          <div className="flex flex-col">
            <div className="inline-flex items-center">
              <div className="h-8 w-8 bg-black rounded-full"></div>
              <p className="ml-4">{message}</p>
            </div>
          </div>
        ),
      })
    }

    mutate()
    console.log("mutated")
    //revalidatePath("/dashboard/wallet")
  }
  useEffect(() => {
    async function fetcTransaction() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      const subscription = supabase
        .channel("transactions")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "transactions",
            filter: `receiver_id=eq.${user?.id}`,
          },
          (payload) => handleUpdates(payload)
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "transactions",
            filter: `sender_id=eq.${user?.id}`,
          },
          (payload) => handleUpdates(payload)
        )
        .subscribe()

      return () => {
        subscription.unsubscribe()
      }
    }

    fetcTransaction()
  }, [supabase, handleUpdates])

  return <></>
}

export default Realtime
