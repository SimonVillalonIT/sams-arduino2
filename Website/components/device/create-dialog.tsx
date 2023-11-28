import React from "react"
import { Loader2 } from "lucide-react"

import { createSchema, handleCreateSubmit } from "@/lib/classroom"
import { useForm } from "@/hooks/use-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Button } from "../ui/button"
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"

function CreateDialog() {
  const { form, isLoading, onSubmitWithToast, error } = useForm(
    createSchema,
    handleCreateSubmit
  )
  return (
    <DialogContent>
      <DialogHeader>
        {error ? error : <DialogTitle>Crea un nuevo aula</DialogTitle>}
      </DialogHeader>
      <Form {...form}>
        <form
          autoComplete="off"
          className="space-y-6"
          onSubmit={form.handleSubmit(onSubmitWithToast)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Nombre" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deviceId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Id del dispositivo</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese el id del dispositivo"
                    type="text"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            title={isLoading ? "Cargando..." : "Iniciar sesión"}
            type="submit"
            className="w-1/3 "
            disabled={isLoading}
            {...(isLoading && { "aria-label": "Cargando..." })}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : "Crear"}
          </Button>
        </form>
      </Form>
    </DialogContent>
  )
}

export default CreateDialog
