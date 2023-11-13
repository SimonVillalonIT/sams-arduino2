import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, MoreVertical, Share2, Trash } from "lucide-react"

import { deleteClassroom } from "@/lib/classroom"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Dialog, DialogTrigger } from "../ui/dialog"
import ShareCard from "./share-card"

const OptionsMenu = ({ id }: { id: string }) => {
  const router = useRouter()
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)

  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MoreVertical className="absolute top-3 right-3" />
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
              Eliminar <Trash size={16} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {id ? <ShareCard id={id} /> : null}
      </Dialog>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
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
              onClick={async (event: any) => {
                event.preventDefault()
                setIsDeleteLoading(true)
                try {
                  await deleteClassroom(id)
                  setIsDeleteLoading(false)
                  setShowDeleteAlert(false)
                  router.refresh()
                } catch (error) {
                  console.log(error)
                }
              }}
              className="bg-red-600 focus:ring-red-600"
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
    </>
  )
}

export default OptionsMenu
