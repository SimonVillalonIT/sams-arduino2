"use client"

import { PropsWithChildren } from "react"

import { Toaster } from "@/components/ui/toaster"
import DashboardNav from "@/components/dashboard/dashboard-nav"

function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
      <aside className="hidden w-[200px] flex-col sticky md:flex">
        <DashboardNav />
      </aside>
      <main className="flex w-full flex-1 flex-col overflow-hidden">
        {children}
        <Toaster />
      </main>
    </div>
  )
}

export default DashboardLayout
