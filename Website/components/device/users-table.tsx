import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, MoreVertical, Share2, Trash } from "lucide-react"

import { deleteClassroom, deleteUserClassroom } from "@/lib/classroom"
import useShare from "@/hooks/use-share"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import ChangePermission from "../dashboard/change-permission"
import ShareCard from "../dashboard/share-card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"
import { Dialog, DialogTrigger } from "../ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useToast } from "../ui/use-toast"

function UsersTable({ deviceId }: { deviceId: string }) {
  const { users } = useShare(deviceId)
  const { toast } = useToast()
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)

  const router = useRouter()

  if (!users || users?.length === 0) {
    return (
      <section>
        <h1 className="text-center"> No hay usuarios</h1>
      </section>
    )
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Nro</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Permisos</TableHead>
          <TableHead className="text-right">Opciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user, i) => (
          <TableRow>
            <TableCell className="font-medium">{i + 1}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="flex w-full">
              <ChangePermission
                className="w-48 ml-0"
                key={user.id}
                userId={user.id}
                deviceId={deviceId}
                admin={user.admin}
              />
            </TableCell>
            <TableCell>
              <Dialog>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex w-full justify-end">
                      <MoreVertical />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <DialogTrigger className="flex justify-between w-full">
                        Compartir <Share2 size={16} />
                      </DialogTrigger>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setShowDeleteAlert(true)}
                      className="flex justify-between text-destructive"
                    >
                      Eliminar usuario <Trash size={16} />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                {deviceId ? <ShareCard id={deviceId} /> : null}
              </Dialog>
              <AlertDialog
                open={showDeleteAlert}
                onOpenChange={setShowDeleteAlert}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      ¿Estas seguro que quieres borrar el dispositivo?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta accion no puede deshacerse
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 focus:ring-red-600"
                      onClick={async (event: any) => {
                        event.preventDefault()
                        setIsDeleteLoading(true)
                        try {
                          await deleteUserClassroom(deviceId, user.id)
                          setIsDeleteLoading(false)
                          setShowDeleteAlert(false)
                          router.refresh()
                        } catch (error) {
                          toast({
                            title: "Ups! Hubo un error.",
                            description: "Hubo un error al eliminar al usuario",
                          })
                        }
                      }}
                    >
                      {isDeleteLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Trash className="mr-2 h-4 w-4" />
                      )}
                      <span>Borrar</span>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default UsersTable
