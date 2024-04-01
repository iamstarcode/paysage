"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Transaction } from "@/types"
import { createClient } from "@/utils/supabase/client"
import { User } from "@supabase/supabase-js"
import { LoaderIcon, MoreHorizontal } from "lucide-react"

import { Tables } from "@/types/g-supabase"
import { useCurrencies, useTransactions } from "@/hooks/supabase"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "@/components/ui/use-toast"
import { TransactionSkeleton } from "@/components/skeletons/transactions"

export default function Page() {
  const router = useRouter()
  const supabase = createClient()
  const {
    transactions,
    isTranasctionsLoading,
    loadMoreTranasction,
    isTranasctionsValidating,
    transactionsError,
  } = useTransactions()

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUser(user)
    }
    getUser()
  }, [supabase])

  //const
  const { data: currencies, isLoading: isCurrenciesLoading } = useCurrencies()

  //console.log(transactions, "gfgdg")
  if (transactionsError) <div>An error occured</div>
  if (isCurrenciesLoading) return <TransactionSkeleton />

  const generateDescription = (transaction: Tables<"transactions">) => {
    return "jijij"
  }

  return (
    <div className="flex flex-col">
      <Link href={`/dashboard/transactions/2`}>View details</Link>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[150px]">Detaials</TableHead>
            <TableHead className="hidden md:table-cell">Type</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="hidden sm:table-cell">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions?.map((transaction: Transaction) => (
            <TableRow
              className="cursor-pointer"
              key={transaction.id}
              onClick={() => router.push(`/dashboard/transactions/${id}`)}
            >
              <TableCell>{generateDescription(transaction)}</TableCell>
              <TableCell className="hidden md:table-cell">
                {transaction.transaction_type}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {transaction.created_at}
              </TableCell>
              <TableCell className="text-right">
                {transaction.amount}
                {transaction.currency}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {transaction.transaction_status}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoreHorizontal className="w-4 h-4" color="#5c5757" />

                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Link href={`/dashboard/transactions/${transaction.id}`}>
                        View details
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        disabled={isTranasctionsValidating}
        onClick={loadMoreTranasction!}
        className="ml-auto mt-5"
      >
        {isTranasctionsValidating && (
          <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
        )}
        {isTranasctionsValidating
          ? "Loading..."
          : !loadMoreTranasction
            ? "Load Complete"
            : "Load More"}
      </Button>
    </div>
  )
}
