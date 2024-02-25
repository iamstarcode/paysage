"use client"

import { SVGProps } from "react"
import { Transaction } from "@/types"
import { createClient } from "@/utils/supabase/client"
import {
  getProfileByIdQuery,
  getProfileByUsernameQuery,
} from "@/utils/supabase/queries"
import { LoaderIcon } from "lucide-react"
import useSWR from "swr"

import { Tables } from "@/types/g-supabase"
import {
  useCurrencies,
  useProfileById,
  useTransactions,
  useUser,
} from "@/hooks/supabase"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import TransactionDetails from "@/components/trasaction-details"

const supabase = createClient()

/* async function getTransctions() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .order("id", { ascending: false })

  const { data: currencies } = await supabase.from("currencies").select("*")

  return { transactions, user, currencies }
} */
export default function Page() {
  const {
    transactions,
    isTranasctionsLoading,
    loadMoreTranasction,
    isTranasctionsValidating,
    transactionsError,
  } = useTransactions()

  const { user, isUserLoading } = useUser()
  const { data: currencies, isLoading: isCurrenciesLoading } = useCurrencies()

  async function generateDescription(
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
          const { data: profile } = await createClient()
            .from("profiles")
            .select("*")
            .eq("id", senderId)
            .single()
          //const { profile } = useProfileById(senderId)
          return `Recieved from ${profile?.first_name} ${profile?.last_name}`
        }
      } else {
        return description
      }
    }
  }

  if (transactionsError) <div>An error occured</div>
  if (isUserLoading || isCurrenciesLoading) return <TransactionSkeleton />

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
              description,
              transaction_date,
              status,
            }: Transaction) => (
              <TableRow key={id}>
                <TableCell>
                  {generateDescription(
                    sender_id!,
                    receiver_id!,
                    transaction_type,
                    description!
                  )}
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
                        <MoreHorizontalIcon className="w-4 h-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <TransactionDetails />
                      </DropdownMenuItem>
                      <DropdownMenuItem>Customer details</DropdownMenuItem>
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

function MoreHorizontalIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  )
}
