import * as React from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/axios";
import useUserStore from "@/stores/userStore";

const loginSchema = z.object({
    email: z.string().email({ message: "¡El formato del correo electrónico es inválido!" }),
    password: z.string().min(8,{message:"¡La contraseña debe tener por lo menos 8 caractéres!"}),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function useLoginForm(): {
    form: UseFormReturn<LoginSchema>;
    onSubmit: (values: LoginSchema) => Promise<void>;
    error: string;
    isLoading: boolean;
} {
    const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = React.useState(false);
    const {setId} = useUserStore()
    const [error, setError] = React.useState("");
    const router = useRouter();
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const onSubmit = async ({ email, password }: LoginSchema): Promise<void> => {
        if (isSuccessfullySubmitted) setIsSuccessfullySubmitted(false);

        const {data} = await api.post("auth/login",{email, password});
        if (data) {
            console.log(data)
            setId(data.id)
            setIsSuccessfullySubmitted(true);
            return router.push("/");
        }
        form.reset();
    };

    return {
        form,
        onSubmit,
        error,
        isLoading: form.formState.isSubmitting || isSuccessfullySubmitted,
    };
}
