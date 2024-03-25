import Image from "next/image"
import { getURL } from "@/utils/helpers"

export default async function Currencies() {
  const res = await fetch(getURL() + "/api/currencies", { method: "POST" })
  const data = await res.json()
  ///console.log(data, "ggg")
  return (
    <div className="w-full py-12">
      <div className="container px-4 md:px-6 flex flex-col gap-4">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold tracking-tight">My Currencies</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your fiat and cryptocurrencies with ease.
          </p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {Array.from({ length: 13 }).map((_, i) => (
            <div
              key={i}
              className=" border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm"
            >
              <div className="flex flex-col gap-4 h-full items-center justify-center p-4 w-full">
                <Image
                  className="text-lg font-semibold tracking-tight"
                  height={48}
                  width={48}
                  alt="xxds"
                  src={`/img/currencies/btc.svg`}
                />

                <p className="text-sm leading-none text-gray-500 dark:text-gray-400">
                  $BTC
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
