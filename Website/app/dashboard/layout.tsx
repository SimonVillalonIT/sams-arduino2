"use client"

import { PropsWithChildren, useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import DashboardNav from "@/components/dashboard/dashboard-nav"

function DashboardLayout({ children }: PropsWithChildren) {
  const { toast } = useToast()
  const params = useSearchParams()
  useEffect(() => {
    if (params.get("success") === "true") {
      toast({ description: "Invitacion aceptada con exito."})
    } else if (params.get("success") === "false") {
      toast({
        variant: "destructive",
        title: "Ups! Hubo un error",
        description: "Ocurrio un error durante el procesamiento del link."
      })
    }
  }, [])
  return (
    <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
      <aside className="hidden w-[200px] flex-col md:flex">
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
