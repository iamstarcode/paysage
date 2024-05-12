import { apiRouteHandler } from "@/utils/helpers"
import { createClient } from "@/utils/supabase/server"

import { Database } from "@/types/g-supabase"

export async function POST(request: Request) {
  //const { headers } = request

  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log(user, "Sxwxwxwx")

  return
  try {
    const fetcher = await apiRouteHandler({
      request,
      urlSegment: "/accounts/list",
      method: "POST",
    })

    const data = await fetcher.json()
    console.log(data)
  } catch (error) {
    console.log(error)
  }

  return Response.json({ aa: "exedk" })
}
