"use client"

import { Button } from "components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card"
import { Separator } from "components/ui/separator"
import { Switch } from "components/ui/switch"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function SettingsPage() {
  return (
    <section>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Configuraciones</h2>
        <p className="text-muted-foreground">
          Maneja los niveles que consideres adecuados para tu institución
        </p>
        <p className="text-muted-foreground/80 text-sm font-light">
          Los niveles que estan establecidos por defecto son los que
          recomendamos
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <Card>
          <CardHeader>
            <CardTitle>Niveles aceptados</CardTitle>
            <CardDescription>
              Administra los niveles que consideres aceptados.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 grid-cols-2">
            <div className="flex flex-col items-center justify-between space-x-2">
              <Label htmlFor="necessary" className="flex flex-col ">
                <span>Strictly Necessary</span>
              </Label>
              <Input
                name="max-acepted"
                max={200}
                min={0}
                type="number"
                defaultValue={30}
              />
            </div>

            <div className="flex flex-col items-center justify-between space-y-2 space-x-2 ">
              <Label htmlFor="functional" className="flex flex-col ">
                <span>Functional Cookies</span>
              </Label>
              <Input
                name="max-medium"
                max={200}
                min={0}
                type="number"
                value={30}
                defaultValue={30}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Save preferences
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}

export default SettingsPage
