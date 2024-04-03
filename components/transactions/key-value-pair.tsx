export default function KeyValuePair({ kee, value }: { kee: any; value: any }) {
  return (
    <div className="flex items-center">
      <div className="font-medium">{kee}</div>
      <div className="ml-auto text-gray-500 dark:text-gray-400">{value}</div>
    </div>
  )
}
