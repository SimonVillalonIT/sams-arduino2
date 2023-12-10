import Link from "next/link"
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog"
import { LucideIcon, PenBox, Plus, Settings, UserIcon } from "lucide-react"

import CreateDialog from "../device/create-dialog"
import { Button } from "../ui/button"

const InfoCard = ({
  title,
  text,
  Icon,
  button,
  link,
}: {
  title: string
  text: string
  Icon?: LucideIcon
  button?: boolean
  link?: boolean
}) => {
  return (
    <article className="bg-slate-900/20 rounded-lg p-4 flex flex-col">
      <div className="flex items-center mb-4">
        {Icon ? <Icon size={24} /> : null}
        <h2 className="text-lg ml-2 font-semibold">{title}</h2>{" "}
      </div>
      <p className="text-primary/60 text-md font-light">{text}</p>
      <div className="flex justify-center items-center my-8 w-full h-full">
        {button ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus />
                Crear
              </Button>
            </DialogTrigger>
            <CreateDialog />
          </Dialog>
        ) : null}
        {link ? (
          <Link
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
            href="/dashboard/settings"
          >
            <Settings />
            Ir a configuraciones
          </Link>
        ) : null}
      </div>
    </article>
  )
}

function NoInfo() {
  const infoCards = [
    {
      title: "Crea tu primera aula",
      text: "Haz clic en el botón 'Crear Aula' para comenzar a configurar el monitoreo de sonido.",
      Icon: PenBox,
      button: true,
    },
    {
      title: "Invitar a personas",
      text: "Comparte la responsabilidad y colabora con otros miembros del equipo para un seguimiento efectivo.",
      Icon: UserIcon,
    },
    {
      title: "Configurar límites de sonido",
      text: "Ajusta los niveles de sonido permitidos para asegurar un entorno de aprendizaje óptimo.",
      Icon: Settings,
      link: true,
    },
  ]
  return (
    <section className="h-full">
      <h1 className="text-xl font-bold">No tienes dispositivos enlazados!</h1>
      <h3 className="text-primary/60 text-md font-medium">
        ¿Qué puedes hacer a continuación?
      </h3>
      <div className="grid grid-cols-3 gap-4 mt-12">
        {infoCards.map((card, i) => (
          <InfoCard key={i} {...card} />
        ))}
      </div>
    </section>
  )
}

export default NoInfo
