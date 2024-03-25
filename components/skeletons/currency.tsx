function CurrencySkeleton() {
  return (
    <div className="w-32 h-32 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm animate-pulse">
      <div className="flex flex-col gap-4 h-full items-center justify-center p-4 w-full">
        <div className="w-12 h-12 bg-gray-200 rounded"></div>
        <div className="w-8 h-4 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}

export default CurrencySkeleton
