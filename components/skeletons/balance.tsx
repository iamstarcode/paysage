export default function BalanceSkeleton() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm animate-pulse">
      <div className="p-6 flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
      </div>
      <div className="p-6 pt-0">
        <div className="flex flex-row justify-between items-center mt-5">
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="inline-flex space-x-2">
            <div className="h-10 w-10 bg-gray-200 rounded"></div>
            <div className="h-10 w-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
