import { useCallback, useEffect, useState } from "react"

import api from "@/lib/axios"
import { useToast } from "@/components/ui/use-toast"

export default function useShare(id: string) {
  const { toast } = useToast()
  const [users, setUsers] = useState<User[] | null>(null)
  const [url, setUrl] = useState<string>("")
  const getUsers = async (id: string) => {
    try {
      const { data } = await api.get("/device/deviceUsers/" + id)
      type RawUser = User & {
        "user-device": { admin: boolean }
      }
      data.data = data.data.map((item: RawUser) => {
        const {
          name,
          id,
          email,
          createdAt,
          updatedAt,
          "user-device": { admin },
        } = item

        // Create a new object with the desired structure
        return { id, name, email, admin, createdAt, updatedAt }
      })
      setUsers(data.data)
    } catch (error) {}
  }
  const getLink = useCallback(
    async (id: string) => {
      try {
        const { data } = await api.post("/invitation/generate", {
          deviceId: id,
        })
        setUrl(data.data.url)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Ups! Parece que hubo un error",
          description: "Hubo un error al obtener el link, intentalo nuevamente",
        })
        console.log(error)
      }
    },
    [id]
  )
  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    toast({ description: "Copiado con exito!" })
  }
  useEffect(() => {
    getUsers(id)
    getLink(id)
  }, [id])

  return {
    handleCopy,
    users,
    url,
  }
}
