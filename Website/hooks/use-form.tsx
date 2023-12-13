"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import useUserStore from "@/stores/user-store"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm as useFormHook } from "react-hook-form"
import * as z from "zod"

import { useToast } from "@/components/ui/use-toast"

export function useForm(
  formSchema: z.ZodSchema,
  handleSubmit: (
    values: z.infer<typeof formSchema>
  ) => Promise<{ data: { id: string }; error: string | null }>
) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { setId } = useUserStore()
  const form = useFormHook<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const { data, error } = await handleSubmit(values)
    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }
    if (data) {
      setId(data.id)
      router.refresh()
    }
  }
  async function onSubmitWithToast(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const { data, error } = await handleSubmit(values)
    if (error) {
      setError(error)
      toast({
        title: "Ups! Hubo un error",
        description: "A ocurrido un error en la creacion del dispositivo",
        variant: "destructive",
      })

      setIsLoading(false)
      return
    }
    if (data) {
      toast({ title: "Exito!", description: "El aula se creó correctamente" })
    }
    setIsLoading(false)
  }

  return {
    form,
    onSubmit,
    onSubmitWithToast,
    error,
    isLoading,
  }
}
