import { ModeToggle } from "../mode-toggle";
import Link from "./navigation-link";
import { cookies } from "next/headers"
import LogOut from "./sign-out"

export default function Navbar() {
    const cookieStore = cookies()
    const session = cookieStore.get("accessToken")?.value
    return (
        <header className="flex sticky h-16  items-center justify-between px-8">
            <button className="px-4 py-3 rounded-xl font-semibold text-xl hover:bg-slate-700/20" >SAMS</button>
            <nav className="flex items-center">
                <ModeToggle />
                <Link text="Inicio" href="/" />
                <Link text="Características" href="/#features" />
                {session ?  <LogOut /> :
                    <Link contrast={true} text="Iniciar sesión" href="/auth" />}
            </nav>
        </header>
    )
}
