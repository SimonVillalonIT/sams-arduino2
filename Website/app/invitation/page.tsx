import React, { useEffect } from "react"
import { useRouter } from "next/navigation"

import api from "@/lib/axios"
import { useToast } from "@/components/ui/use-toast"

function InvitationPage() {
  const router = useRouter()
  const invitationCallback = async () => {
    try {
      const cookies = document.cookie.split(";")
      let index = -1

      for (let i = 0; i < cookies.length; i++) {
        if (cookies[i].includes("invitation=")) {
          index = i
          break
        }
      }

      if (index === -1) return
      await api.get(
        `/invitation/validate?token=${cookies[index].split("=")[1]}`
      )
      router.push("/dashboard?success=true")
    } catch (error) {
      router.push("/dashboard?success=false")
    }
  }
  useEffect(() => {
    invitationCallback()
  }, [])
  return <div>...Loading</div>
}

export default InvitationPage
