import { ModeToggle } from "../mode-toggle";
import Link from "./navigation-link";
import { cookies } from "next/headers"
import LogOut from "./sign-out"
import Menu from "./menu";

export default function Navbar() {
    const cookieStore = cookies()
    const session = cookieStore.get("accessToken")?.value
    return (
        <header className="container z-40 bg-background">
            <div className="flex h-20 items-center justify-between py-6">
                <div className="flex gap-6 md:gap-10">
                    <a className="hidden items-center space-x-2 md:flex" href="/">
                        <span className="hidden font-bold sm:inline-block text-2xl">SAMS</span>
                    </a>
                    <Menu />
                </div>
                <nav className="hidden gap-6 md:flex">
                    <Link href="/contact" text="Contactanos" />
                    <Link href="/contact" text="Contactanos" />
                    <a className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60" href="/blog">Blog</a><a className="flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm text-foreground/60" href="/docs">Documentation</a>
                </nav>
                <nav>
                    {session ? <LogOut /> : <a className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-4" href="/login">Login</a>}
                </nav>
            </div>
        </header>
    )
}
