"use client"

import { Loader2 } from "lucide-react"

import { handleRegisterSubmit, registerSchema } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { useForm } from "@/hooks/use-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export default function RegisterForm({
  changeState,
}: {
  changeState: (bool: boolean) => void
}) {
  const { form, error, isLoading, onSubmit } = useForm(
    registerSchema,
    handleRegisterSubmit
  )

  return (
    <Card className="md:w-[700px]">
      <CardHeader>
        <CardTitle>Registro</CardTitle>
        <CardDescription className={cn(error && "text-destructive")}>
          {error ? error : "Introduce tus credenciales para iniciar sesión."}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            autoComplete="off"
            className="space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
          <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nombre"
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Correo electrónico"
                      type="email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Contraseña"
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="repassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Validar contraseña</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Validar contraseña"
                      type="password"
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
              {isLoading ? <Loader2 className="animate-spin" /> : "Registrarse"}
            </Button>
            <p className="text-md text-muted-foreground">
              Ya tienes una cuenta?{" "}
              <span
                onClick={() => changeState(true)}
                className="text-foreground font-bold cursor-pointer"
              >
                Inicia sesión
              </span>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
