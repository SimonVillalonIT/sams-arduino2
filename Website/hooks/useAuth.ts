"use client"
import api from "@/lib/axios"
import {useRouter}  from "next/navigation"

export default function useAuth() {
    const router = useRouter()
    const handleLogOut = async () => {
        await api.get("auth/logout")
        router.refresh()
    }

    const getPrivateInfo = async () => {
        const { data } = await api.get("auth/protected"
        )
        console.log(data)
    }
    return { getPrivateInfo, handleLogOut}
}
