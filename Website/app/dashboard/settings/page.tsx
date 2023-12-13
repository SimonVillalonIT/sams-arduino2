"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card"
import { Separator } from "components/ui/separator"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import api from "@/lib/axios"
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
import { useToast } from "@/components/ui/use-toast"

const formSchema = z
  .object({
    "max-acepted": z
      .number({
        required_error: "¡No puede estar vacio!",
        invalid_type_error: "¡Debes ingresar un numero!",
      })
      .min(1, {
        message: "¡El valor mínimo es 1!",
      })
      .max(60, "¡El valor máximo es 60!"),
    "max-warning": z
      .number({
        required_error: "¡No puede estar vacio!",
        invalid_type_error: "¡Debes ingresar un numero!",
      })
      .min(10, {
        message: "¡El valor mínimo es 10!",
      })
      .max(70, "¡El valor máximo es 70!"),
  })
  .refine((data) => data["max-acepted"] <= data["max-warning"], {
    message: "El máximo aceptable no puede superar al maximo de advertencia",
    path: ["max-acepted"],
  })

function SettingsPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "max-acepted": 20,
      "max-warning": 30,
    },
  })

  const onSubmit = (data: { "max-acepted": number; "max-warning": number }) => {
    setLoading(true)
    try {
      api.post("/settings", data)
      setLoading(false)
      toast({ description: "¡Se actualizaron las configuraciones con exito!" })
    } catch (error) {
      setLoading(false)
      toast({
        title: "Ups! Hubo un error al actualizar las configuraciones",
        variant: "destructive",
      })
    }
  }
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
