"use client"

import { Loader2 } from "lucide-react"

import { handleLoginSubmit, loginSchema } from "@/lib/auth"
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

export default function LoginForm({
  changeState,
}: {
  changeState: (bool: boolean) => void
}) {
  const { form, error, isLoading, onSubmit } = useForm(
    loginSchema,
    handleLoginSubmit
  )

  return (
    <Card className="min-w-[700px]">
      <CardHeader>
        <CardTitle>Iniciar sesión</CardTitle>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Correo electrónico"
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

            <Button
              title={isLoading ? "Cargando..." : "Iniciar sesión"}
              type="submit"
              className="w-1/3 "
              disabled={isLoading}
              {...(isLoading && { "aria-label": "Cargando..." })}
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Iniciar sesión"
              )}
            </Button>
            <p className="text-md text-muted-foreground">
              No tienes una cuenta?{" "}
              <span
                onClick={() => changeState(false)}
                className="text-foreground font-bold cursor-pointer"
              >
                Registrate
              </span>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
