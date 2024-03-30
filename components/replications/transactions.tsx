/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useState } from "react"
import { revalidatePath } from "next/cache"
import { createClient } from "@/utils/supabase/client"
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js"
import { toast } from "sonner"

import { useTransactions } from "@/hooks/supabase"

function Realtime() {
  const supabase = createClient()
  const [state, setState] = useState({})
  const { mutate } = useTransactions()

  useEffect(() => {
    //console.log(state)
  }, [state])
  const handleUpdates = async (
    payload: RealtimePostgresChangesPayload<any>
  ) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    //TODO, maybe to handle only to have the notifaction if the user is for this person
    if (!user) return

    if (payload?.new?.receiver_id! == user?.id) {
      console.log("you the reciever")
    } else {
      console.log("you the sender")
    }

    if (payload.eventType == "INSERT") {
      toast.info("Pending")
    } else if (payload.eventType == "UPDATE") {
      toast.success(`${user?.id}`)
    }

    mutate()
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
