export default function TransactionSkeleton() {
  return (
    <div className="grid gap-1 md:gap-2 animate-pulse">
      <div className="grid gap-1.5 text-sm">
        <div className="flex items-center gap-1.5">
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="p-6 pt-0">
          <div className="grid gap-2 text-md">
            <div className="flex items-center">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="ml-auto inline-flex items-center text-gray-500 dark:text-gray-400">
                <div className="h-4 bg-gray-200 rounded w-20 mr-2"></div>
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-10 ml-auto"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="p-6 pt-0">
          <div className="grid gap-2 text-md">
            <div className="flex items-center">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-20 ml-auto"></div>
            </div>
            <div className="flex items-center">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-20 ml-auto"></div>
            </div>
            <div className="flex items-center">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-10 ml-auto"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="p-6 pt-0">
          <div className="grid gap-2 text-md">
            <div className="flex items-center">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-20 ml-auto"></div>
            </div>
            <div className="flex items-center">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-10 ml-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
