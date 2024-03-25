import { ReactNode } from "react"

function WalletLayout({
  children,
  transaction,
}: {
  children: ReactNode
  transaction: ReactNode
}) {
  return (
    <>
      {children}
      {transaction}
    </>
  )
}

export default WalletLayout
