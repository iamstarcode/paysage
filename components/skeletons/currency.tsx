function CurrencySkeleton() {
  return (
    <div className="container flex flex-col gap-4 md:px-6 px-4 animate-pulse">
      <div className="grid gap-2 mt-5">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        <div className=" border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
          <div className="flex flex-col gap-4 h-full items-center justify-center p-4">
            <div className="w-12 h-12 bg-gray-200 rounded"></div>
            <div className="w-4 h-2 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className=" border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
          <div className="flex flex-col gap-4 h-full items-center justify-center p-4">
            <div className="w-12 h-12 bg-gray-200 rounded"></div>
            <div className="w-4 h-2 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className=" border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
          <div className="flex flex-col gap-4 h-full items-center justify-center p-4">
            <div className="w-12 h-12 bg-gray-200 rounded"></div>
            <div className="w-4 h-2 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className=" border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
          <div className="flex flex-col gap-4 h-full items-center justify-center p-4">
            <div className="w-12 h-12 bg-gray-200 rounded"></div>
            <div className="w-4 h-2 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className=" md:hidden border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
          <div className="flex flex-col gap-4 h-full items-center justify-center p-4">
            <div className="w-12 h-12 bg-gray-200 rounded"></div>
            <div className="w-4 h-2 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="border md:hidden border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
          <div className="flex flex-col gap-4 h-full items-center justify-center p-4">
            <div className="w-12 h-12 bg-gray-200 rounded"></div>
            <div className="w-4 h-2 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrencySkeleton
