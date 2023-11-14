"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Home, LogOut, Radio } from "lucide-react"

import { handleLogOut } from "@/lib/auth"
import { cn } from "@/lib/utils"

export default function DashboardNav() {
  const path = usePathname()

  const items = [
    { href: "/dashboard", Icon: Home, disabled: false, title: "Dashboard" },
    {
      href: "/dashboard/devices",
      Icon: Radio,
      disabled: false,
      title: "Dispositivos",
    },
    {
      href: "/",
      Icon: LogOut,
      disabled: false,
      title: "Cerrar sesión",
      onClick: () => {
        handleLogOut()
        router.refresh()
      },
    },
  ]
  const router = useRouter()
  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const { Icon } = item
        return (
          item.href && (
            <Link
              onClick={item.onClick}
              key={index}
              href={item.disabled ? "/" : item.href}
            >
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent" : "transparent",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        )
      })}
    </nav>
  )
}
