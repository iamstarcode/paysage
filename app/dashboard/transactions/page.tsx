import { SVGProps } from "react"
import { createClient } from "@/utils/supabase/server"

import { Tables } from "@/types/g-supabase"
import { Button } from "@/components/ui/button"
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

async function getTransctions() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: transactions } = await supabase
    .from("transactions")
    .select("*")
    .order("id", { ascending: false })

  return { transactions, user }
}
export default async function Page() {
  const { transactions, user } = await getTransctions()

  function generateDescription(
    id: string,
    type: Tables<"transactions">["transaction_type"],
    description: string
  ) {
    if (type == "fiat") {
      const splited = description.split("&&")
      if (user?.id! == id) return `Transfer to ${splited[1]}`
      return `Transfer from ${splited[0]}`
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
              actor,
              amount,
              transaction_type,
              description,
              transaction_date,
              status,
            }) => (
              <TableRow key={id}>
                <TableCell>{`${generateDescription(actor!, transaction_type, description!)}`}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {transaction_type}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {transaction_date}
                </TableCell>
                <TableCell className="text-right">${amount}</TableCell>
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
                      <DropdownMenuItem>View order</DropdownMenuItem>
                      <DropdownMenuItem>Customer details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          )}
          <TableRow>
            <TableCell>Olivia Martin</TableCell>
            <TableCell className="hidden md:table-cell">Online Store</TableCell>
            <TableCell className="hidden md:table-cell">
              February 20, 2022
            </TableCell>
            <TableCell className="text-right">$42.25</TableCell>
            <TableCell className="hidden sm:table-cell">Shipped</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <MoreHorizontalIcon className="w-4 h-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View order</DropdownMenuItem>
                  <DropdownMenuItem>Customer details</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
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
