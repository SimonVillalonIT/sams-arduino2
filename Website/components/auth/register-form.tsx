"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useRegisterForm from "@/hooks/useRegisterForm";
import { Loader2 } from "lucide-react"

export default function RegisterForm({ changeState }: { changeState: (bool: boolean) => void }) {
    const { form, onSubmit, error, isLoading } = useRegisterForm();

    return (
        <Card className="md:min-w-[700px]">
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
                        <FormField
                            control={form.control}
                            name="repassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Validar contraseña</FormLabel>

                                    <FormControl>
                                        <Input
                                            placeholder="Validar contraseña"
                                            type="repassword"
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
                                "Registrarse"
                            )}
                        </Button>
                        <p className="text-md text-muted-foreground" >Ya tienes una cuenta? <span onClick={() => changeState(true)} className="text-foreground font-bold cursor-pointer">Inicia sesión</span></p>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
