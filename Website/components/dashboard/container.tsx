import { PropsWithChildren } from "react"
import { Plus } from "lucide-react"

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
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4">
          <Plus className="mr-2" size={16} /> Crear
        </button>
      </div>
      <div className="grid grid-cols-4 gap-8">{children}</div>
    </section>
  )
}
