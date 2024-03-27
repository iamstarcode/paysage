/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useCallback, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"
import {
  RealtimePostgresChangesPayload,
  RealtimePostgresInsertPayload,
} from "@supabase/supabase-js"
import { toast } from "sonner"

function Realtime() {
  const supabase = createClient()

  const handleUpdates = async (
    payload: RealtimePostgresChangesPayload<any>
  ) => {
    const user = await supabase.auth.getUser()
    console.log("Change received!", payload, user)
    if (payload.eventType == "INSERT") {
      toast.info("Pending")
    } else if (payload.eventType == "UPDATE") {
      toast.success("Sucess")
    }
  }
  useEffect(() => {
    async function fetcTransaction() {
      const user = await supabase.auth.getUser()
      const subscription = supabase
        .channel(`user:${user.data.user?.id}`)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "currencies" },
          handleUpdates
        )
        .subscribe()

      // Clean up subscription on unmount
      return () => {
        subscription.unsubscribe()
      }
    }

    fetcTransaction()
  }, [supabase, handleUpdates])

  return <></>
}

export default Realtime
