import { ReactNode } from "react"

function WalletLayout({
  children,
  modal,
}: {
  children: ReactNode
  modal: ReactNode
}) {
  return (
    <>
      {children}
      {/* {modal} */}
    </>
  )
}

export default WalletLayout
