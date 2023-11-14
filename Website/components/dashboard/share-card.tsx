import useShare from "@/hooks/use-share"

import { Avatar, AvatarFallback } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Input } from "../ui/input"
import ChangePermission from "./change-permission"

export default function ShareCard({ id }: { id: string }) {
  const { url, users, handleCopy } = useShare(id)
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
            {users ? (
              users.map((user) => {
                return (
                  <div
                    key={user.id}
                    className="flex items-center justify-between space-x-4"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">
                          {user.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <ChangePermission
                      key={user.id}
                      userId={user.id}
                      deviceId={id}
                      admin={user.admin}
                    />
                  </div>
                )
              })
            ) : (
              <p className="text-muted-foreground text-sm">
                No se encontraron usuarios, puedes comenzar a invitar con el
                link de arriba.
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </>
  )
}
