"use client";
import useAuth from "@/hooks/useAuth";
import { LogOut } from "lucide-react"

export default function SignOut() {
    const { handleLogOut } = useAuth();

    return <button onClick={handleLogOut}><LogOut /></button>;
}
