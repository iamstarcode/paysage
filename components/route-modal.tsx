"use client"

import { ReactNode } from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"

import { ScrollArea } from "@/components/ui/scroll-area"

function RouteModal({
  children,
  title,
}: {
  children: ReactNode
  title?: string
}) {
  const router = useRouter()
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="rounded-md w-full md:max-w-lg">
        <div className="flex items-center z-50">
          <div className="mx-4 md:mx-auto bg-gray-100 border rounded-lg border-gray-200 w-full md:max-w-lg md:mt-auto shadow-lg dark:border-gray-800 dark:bg-gray-950">
            <div className="grid gap-4 p-6">
              <div className="inline-flex justify-between items-center">
                <h1 className="font-semibold text-2xl">{title}</h1>

                <X
                  onClick={() => router.back()}
                  className="w-4 h-4 cursor-pointer"
                  color="#5c5757"
                />
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RouteModal
