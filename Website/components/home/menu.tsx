"use client"
import { useState } from "react"
import { twMerge } from "tailwind-merge"

export default function Menu() {
    const [hidden, setHidden] = useState(false)
    return (
        <>
            <button onClick={() => setHidden(v => !v)} className={twMerge("flex items-center space-x-2 md:hidden", !hidden ? "hidden" : "")} ><span className="font-bold">Menu</span></button >
            <div className={twMerge("fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden", !hidden ? "hidden" : "")}><div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md"><a className="flex items-center space-x-2" href="/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-command"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg><span className="font-bold">Taxonomy</span></a><nav className="grid grid-flow-row auto-rows-max text-sm"><a className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline" href="/#features">Features</a><a className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline" href="/pricing">Pricing</a><a className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline" href="/blog">Blog</a><a className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline" href="/docs">Documentation</a></nav></div></div>
            <button onClick={() => setHidden(v => !v)} className={twMerge("flex items-center space-x-2 md:hidden", hidden ? "hidden" : "")}><span className="font-bold">Menu</span></button>
        </>
    )
}
