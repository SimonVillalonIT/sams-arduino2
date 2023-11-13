import api from "@/lib/axios"
import { useCallback, useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { useToast } from "../ui/use-toast"

export default function ShareCard({id}:{id:string}) {
  const {toast} = useToast()
  const[users, setUsers] = useState<{id:string,name:string,email:string,createdAt: string, updatedAt:string}[]>([])
  const [url, setUrl] = useState<string>("")
    const getUsers = async (id:string)=> {
        try {
       const {data} = await api.get("/device/deviceUsers/" + id)
       console.log(data.data)
      setUsers(data.data)
        } catch (error) {
          console.log(error)
        }
          }
    const getLink = useCallback( async (id:string) => {
        try {
            const {data} = await api.post("/invitation/generate", {deviceId: id})
            setUrl(data.data.url)
        } catch (error) {
          console.log(error)
        }}, [id])
    const handleCopy = ()=> {
 navigator.clipboard.writeText(url)
toast({description: "Copiado con exito!"})
        }
    useEffect(() => {
        getUsers(id)
        getLink(id)
    }, [id])
  return (
    <>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Compartir dispositivo</DialogTitle>
          <DialogDescription>
            Comparte este link con las personas que quieres otorgarle acceso.
          </DialogDescription>
        </DialogHeader>
        <div className="flex space-x-2">
          <Input value={url} readOnly />
          <Button onClick={handleCopy} variant="secondary" className="shrink-0">
            Copiar link
          </Button>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Personas con acceso</h4>
          <div className="grid gap-6">
          {users ? users.map((user)=>(
<div key={user.id} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                  {user.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <Select defaultValue="view">
                <SelectTrigger className="ml-auto w-[110px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="view">Solo lectura</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )) : <p>No hay usuarios</p>
          }
          </div>
        </div>
      </DialogContent>
    </>
  )
}
