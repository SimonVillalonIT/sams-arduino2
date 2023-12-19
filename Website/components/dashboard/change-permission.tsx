import * as React from "react"
import { Loader2 } from "lucide-react"

import api from "@/lib/axios"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useToast } from "../ui/use-toast"
import { cn } from "@/lib/utils"

function ChangePermission({
  admin,
  userId,
  deviceId,
  className
}: {
  admin: boolean
  userId: string
  deviceId: string
  className?: string
}) {
  const { toast } = useToast()
  const [loading, setLoading] = React.useState(false)
  const [permission, setPermission] = React.useState(admin ? "admin" : "view")
  const handleChange = async (e: string) => {
    setLoading(true)
    try {
      const admin = e === "admin" ? true : false
      await api.put("/invitation/changePermission", {
        userId: userId,
        admin,
        deviceId: deviceId,
      })
      setPermission(e)
      setLoading(false)
      toast({ title:"Cambio realizado exitosamente!", description: "Los permisos han sido cambiados exitosamente!" })
    } catch (error) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Ups! Hubo un error",
        description: "Hubo un error al actualizar los permisos",
      })
      setPermission((prev) => prev)
      setLoading(false)
    }
  }
  return (
    <Select value={permission} disabled={loading} onValueChange={handleChange}>
      <SelectTrigger className={cn("ml-auto w-[110px]", className)}>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {loading ? (
          <Loader2 />
        ) : (
          <>
            <SelectItem value="admin">Administrador</SelectItem>
            <SelectItem value="view">Solo lectura</SelectItem>
          </>
        )}
      </SelectContent>
    </Select>
  )
}
export default ChangePermission
