"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Transaction } from "@/types"
import { createClient } from "@/utils/supabase/client"
import { LoaderIcon, MoreHorizontal } from "lucide-react"

import { useCurrencies, useTransactions, useUser } from "@/hooks/supabase"
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
import { TransactionSkeleton } from "@/components/skeletons/transactions"

const supabase = createClient()

export default function Page() {
  const router = useRouter()
  const {
    transactions,
    isTranasctionsLoading,
    loadMoreTranasction,
    isTranasctionsValidating,
    transactionsError,
  } = useTransactions()

  const { user, isUserLoading } = useUser()

  const { data: currencies, isLoading: isCurrenciesLoading } = useCurrencies()

  /*   function generateDescription(
    senderId: string,
    recieverId: string,
    type: Transaction["transaction_type"],
    description: string
  ) {
    if (type == "FIAT") {
      if (senderId && recieverId) {
        //in house
        if (user?.id == senderId) {
          return description
        } else {
          let profile: any
          supabase
            .from("profiles")
            .select("*")
            .eq("id", senderId)
            .single()
            .then((v) => (profile = v))
          // const { profile } = useProfileById(senderId)
          console.log(profile, "bxshbxshxshxbh")
          return `Recieved from ${profile?.first_name!} ${profile?.last_name!}`
        }
      } else {
        return description
      }
    }
  } */

  if (transactionsError) <div>An error occured</div>
  if (isUserLoading || isCurrenciesLoading) return <TransactionSkeleton />

  console.log(transactions)
  return (
    <div className="flex flex-col">
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
          {transactions?.map(
            ({
              id,
              sender_id,
              receiver_id,
              amount,
              currency,
              transaction_type,
              sender_description,
              receiver_description,
              transaction_date,
              status,
            }: Transaction) => (
              <TableRow
                className="cursor-pointer"
                key={id}
                onClick={() => router.push(`/dashboard/transactions/${id}`)}
              >
                <TableCell>
                  {user?.id == sender_id
                    ? sender_description
                    : receiver_description}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {transaction_type}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {transaction_date}
                </TableCell>
                <TableCell className="text-right">
                  {user?.id === sender_id ? "-" : null}
                  {
                    currencies?.find((c) => c.id === parseInt(currency!))
                      ?.currency_sign
                  }
                  {amount}
                </TableCell>
                <TableCell className="hidden sm:table-cell">{status}</TableCell>
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
                        <Link href={`/dashboard/transactions/${id}`}>
                          View details
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          )}
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
