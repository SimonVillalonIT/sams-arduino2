"use client"

import useSettingsStore from "@/stores/settings-store"
import { Button } from "components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card"
import { Separator } from "components/ui/separator"
import { Loader2 } from "lucide-react"

import { useSettings } from "@/hooks/use-settings"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

function SettingsPage() {
  const { form, loading, onSubmit } = useSettings()
  const { setSettings } = useSettingsStore()
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
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 w-1/2">
        <Card>
          <CardHeader>
            <CardTitle>Niveles aceptados</CardTitle>
            <CardDescription>
              Administra los niveles que consideres aceptados.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="gap-4 grid grid-cols-4 p-6"
            >
              <FormField
                control={form.control}
                name="max-acepted"
                render={({ field }) => (
                  <FormItem className="flex flex-col col-span-2 items-center justify-between space-x-2">
                    <FormLabel>Máximo aceptable</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        onChange={(e) => {
                          field.onChange(parseInt(e.target.value))
                          setSettings({
                            "max-acepted": parseInt(e.target.value),
                            "max-warning": form.getValues("max-warning"),
                          })
                        }}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="max-warning"
                render={({ field }) => (
                  <FormItem className="col-span-2 flex flex-col items-center justify-between space-x-2">
                    <FormLabel>Máximo en advertencia</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => {
                          field.onChange(parseInt(e.target.value))
                          setSettings({
                            "max-acepted": form.getValues("max-acepted"),
                            "max-warning": parseInt(e.target.value),
                          })
                        }}
                      />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={loading}
                variant="outline"
                className="w-full col-span-2 col-start-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Guardar configuraciones"
                )}
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </section>
  )
}

export default SettingsPage
