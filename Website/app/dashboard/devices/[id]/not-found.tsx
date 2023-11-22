import React from "react"
import { AlertTriangle } from "lucide-react"

function NotFoundPage() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="p-4 rounded-full bg-muted">
        <AlertTriangle size={48} />
      </div>
      <h1 className="font-semibold text-2xl mt-6">Oh no!</h1>
      <p className="font-thin text-md text-muted-foreground">
        No se pudo encontrar el dispositivo
      </p>
    </div>
  )
}

export default NotFoundPage
