import { useState } from "react"
import useSettingsStore from "@/stores/settings-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import api from "@/lib/axios"
import { settingsSchema } from "@/lib/settings"
import { useToast } from "@/components/ui/use-toast"

export function useSettings() {
  const { settings, setSettings } = useSettingsStore()

  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      "max-accepted": settings["max-accepted"],
      "max-warning": settings["max-warning"],
    },
  })

  const onSubmit = (data: {
    "max-accepted": number
    "max-warning": number
  }) => {
    setLoading(true)
    try {
      api.post("/settings", data)
      setSettings(data)
      setLoading(false)
      toast({ description: "¡Se actualizaron las configuraciones con exito!" })
    } catch (error) {
      setLoading(false)
      toast({
        title: "Ups! Hubo un error al actualizar las configuraciones",
        variant: "destructive",
      })
    }
  }

  return {
    form,
    loading,
    onSubmit,
  }
}
