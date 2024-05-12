import { apiRouteHandler } from "@/utils/helpers"
import { createClient } from "@/utils/supabase/server"

import { Database } from "@/types/g-supabase"

export async function POST(request: Request) {
  //const { headers } = request

  const supabase = createClient()

  const fetcher = await apiRouteHandler({
    request,
    urlSegment: "accounts/list",
    method: "POST",
  })

  console.log(fetcher)
}
