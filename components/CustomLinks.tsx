"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LucideIcon } from "lucide-react"

const CustomLink = ({
  href,
  text,
  Icon,
}: {
  href: string
  text: string
  Icon: any
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
        pathName === href ? "bg-primary text-white" : "text-primary "
      }flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 p-4 hover:font-medium`}
      href={href}
    >
      {Icon}

      {text}
    </Link>
  )
}
export default CustomLink
