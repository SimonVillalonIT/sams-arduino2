"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PropsWithChildren } from "react"

function DashboardLayout({ children }: PropsWithChildren) {
    const client = new QueryClient()
    return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default DashboardLayout
