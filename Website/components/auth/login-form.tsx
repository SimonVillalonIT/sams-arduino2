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
import useLoginForm from "@/hooks/useLoginForm";
import { cn } from "@/lib/utils";

export default function LoginForm({ changeState }: { changeState: (bool: boolean) => void }) {
    const { form, onSubmit, error, isLoading } = useLoginForm();

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
                                "loading..."
                            ) : (
                                "Iniciar sesión"
                            )}
                        </Button>
                        <p className="text-md text-muted-foreground" >No tienes una cuenta? <span onClick={() => changeState(false)} className="text-foreground font-bold cursor-pointer">Inicia sesión</span></p>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
