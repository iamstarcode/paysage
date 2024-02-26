"use client"

import { Skeleton } from "@/components/ui/skeleton"

export function TransactionSkeleton() {
  return (
    <div className="flex flex-col space-y-3">
      <div className="grid grid-cols-5 gap-3">
        <Skeleton className="h-6" />
        <Skeleton className="h-6 " />
        <Skeleton className="h-6 " />
        <Skeleton className="h-6 " />
        <Skeleton className="h-6 " />
      </div>
      <div className="grid grid-cols-5 gap-3 mt-5">
        <Skeleton className="h-24" />
        <Skeleton className="h-24 " />
        <Skeleton className="h-24 " />
        <Skeleton className="h-24 " />
        <Skeleton className="h-24 " />
      </div>
      <div className="grid grid-cols-5 gap-3">
        <Skeleton className="h-24" />
        <Skeleton className="h-24 " />
        <Skeleton className="h-24 " />
        <Skeleton className="h-24 " />
        <Skeleton className="h-24 " />
      </div>
      <div className="grid grid-cols-5 gap-3 mt-auto">
        <Skeleton className="h-12" />
        <Skeleton className="h-12 " />
        <Skeleton className="h-12 " />
        <Skeleton className="h-12 " />
        <Skeleton className="h-12 " />
      </div>
      <div className="grid grid-cols-5 gap-3 mt-auto">
        <Skeleton className="h-12" />
        <Skeleton className="h-12 " />
        <Skeleton className="h-12 " />
        <Skeleton className="h-12 " />
        <Skeleton className="h-12 " />
      </div>{" "}
      <div className="grid grid-cols-5 gap-3 mt-auto">
        <Skeleton className="h-12" />
        <Skeleton className="h-12 " />
        <Skeleton className="h-12 " />
        <Skeleton className="h-12 " />
        <Skeleton className="h-12 " />
      </div>
      <div className="grid grid-cols-5 gap-3 mt-auto">
        <Skeleton className="h-12" />
        <Skeleton className="h-12 " />
        <Skeleton className="h-12 " />
        <Skeleton className="h-12 " />
        <Skeleton className="h-12 " />
      </div>
      <div className="grid grid-cols-5 gap-3 mt-auto">
        <Skeleton className="h-5" />
        <Skeleton className="h-5 " />
        <Skeleton className="h-5 " />
        <Skeleton className="h-5 " />
        <Skeleton className="h-5 " />
      </div>
    </div>
  )
}
