"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import useUserStore from "@/stores/userStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm as useFormHook } from "react-hook-form"
import * as z from "zod"

export function useForm(
  formSchema: z.ZodSchema,
  handleSubmit: (
    values: z.infer<typeof formSchema>
  ) => Promise<{ data: { id: string }; error: string | null }>
) {
  const router = useRouter()
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
      return
    }
    if (data) {
      setId(data.id)
      router.refresh()
    }
    setIsLoading(false)
  }

  return {
    form,
    onSubmit,
    error,
    isLoading,
  }
}
