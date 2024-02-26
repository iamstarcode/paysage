import Link from "next/link"

export default function Layout({
  children,
  transaction,
}: {
  children: React.ReactNode
  transaction: React.ReactNode
}) {
  return (
    <>
      <nav>
        <Link href="/dashboard/transactions">Open modal</Link>
      </nav>
      {children}
      {transaction}
      <div>{transaction}</div>
    </>
  )
}
