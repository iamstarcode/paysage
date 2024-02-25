import { SVGProps } from "react"
import {
  getProfileByIdQuery,
  getProfileByUsernameQuery,
} from "@/utils/supabase/queries"
import { createClient } from "@/utils/supabase/server"
import useSWR from "swr"

import { Tables } from "@/types/g-supabase"
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
import TransactionDetails from "@/components/trasaction-details"

const supabase = createClient()

async function getTransctions() {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .order("id", { ascending: false })

  const { data: currencies } = await supabase.from("currencies").select("*")

  return { transactions, user, currencies }
}
export default async function Page() {
  const { transactions, user, currencies } = await getTransctions()
  console.log(transactions?.length, "sssssssssss")

  async function generateDescription(
    senderId: string,
    recieverId: string,
    type: Tables<"transactions">["transaction_type"],
    description: string
  ) {
    if (type == "FIAT") {
      if (senderId && recieverId) {
        //in house
        if (user?.id == senderId) {
          return description
        } else {
          const { data } = await getProfileByIdQuery(senderId, supabase)
          return `Recieved from ${data?.first_name} ${data?.last_name}`
        }
      } else {
        return description
      }
    }
  }

  function fromOrTo(id: string) {
    if (user?.id! == id) return "to"
    return "from"
  }
  return (
    <div>
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
            }) => (
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
