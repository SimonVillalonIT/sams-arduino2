"use client"

import React, { useCallback, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import api from "@/lib/axios"
import { useToast } from "@/components/ui/use-toast"

function InvitationPage() {
  const { get } = useSearchParams()
  const { toast } = useToast()
  const token = get("token")
  const router = useRouter()
  const validateInvitation = useCallback(async () => {
    try {
      await api.get(`/invitation/validate?token=${token}`)
      toast({
        title: "Exito!",
        description: "Dispositivo agregado exitosamente.",
      })
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Ups! Hubo un error.",
        description: "No se pudo enlazar el dispositivo correctamente",
        variant: "destructive",
      })
      router.push("/dashboard")
    }
  }, [router, toast, token])
  useEffect(() => {
    validateInvitation()
  }, [validateInvitation])
  return <div>...Loading</div>
}

export default InvitationPage
