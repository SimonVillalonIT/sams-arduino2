import { PropsWithChildren } from "react"
import { Plus } from "lucide-react"

import CreateDialog from "../device/create-dialog"
import { Button } from "../ui/button"
import { Dialog, DialogTrigger } from "../ui/dialog"

export default function Container({ children }: PropsWithChildren) {
  return (
    <section className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="font-heading text-3xl md:text-4xl">Dispositivos</h1>
          <p className="text-lg text-muted-foreground">
            Crea y administra tus dispositivos.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus />
              Crear
            </Button>
          </DialogTrigger>
          <CreateDialog />
        </Dialog>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {children}
      </div>
    </section>
  )
}
