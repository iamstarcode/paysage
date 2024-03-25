"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LucideIcon } from "lucide-react"

import { Badge } from "./ui/badge"

const CustomLink = ({
  href,
  title,
  Icon,
  badge,
}: {
  href: string
  title: string
  Icon: React.JSX.Element
  badge?: number
}) => {
  const pathName = usePathname()

  //const [burger, toggle] = useToggle([false, true]);
  //const { width } = useViewportSize();

  //const [burgerOpened, setBurgerOpened] = useAtom(burgerOpenedAtom);

  /*   const handleClick = () => {
    if (width >= 1024) return; //if we are in a bigger screen avoid seeting the burger status
    setBurgerOpened(false);
  }; */

  return (
    <Link
      /*  onClick={handleClick} */
      className={`${
        pathName === href ? "bg-gray-100" : ""
      } flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 p-4 hover:font-medium`}
      href={href}
    >
      {Icon}
      {title}

      {badge! > 0 && (
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          {badge}
        </Badge>
      )}
    </Link>
  )
}

export default function SideLinks() {
  const badge = 10
  const mainNav = [
    {
      title: "Home",
      href: "/dashboard",
      icon: <Home className="h-4 w-4" />,
    },

    {
      title: "Wallet",
      href: "/dashboard/wallet",
      icon: <Home className="h-4 w-4" />,
    },

    {
      title: "Deposit",
      href: "/dashboard/deposits",
      icon: <Home className="h-4 w-4" />,
    },
    {
      title: "Transactions",
      href: "/dashboard/transactions",
      icon: <Home className="h-4 w-4" />,
      badge,
    },

    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: <Home className="h-4 w-4" />,
    },
  ]

  return mainNav.map((link) => (
    <CustomLink
      key={link.title}
      Icon={link.icon}
      href={link.href}
      title={link.title}
      badge={link.badge}
    />
  ))
}
