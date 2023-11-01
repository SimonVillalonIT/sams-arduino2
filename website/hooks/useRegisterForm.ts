import * as React from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/axios";
import useUserStore from "@/stores/userStore";

const registerSchema = z.object({
    email: z.string().email({ message: "¡El formato del correo electrónico es inválido!" }),
    password: z.string().regex(/^(?=.[A-Z])(?=.[a-z])(?=.*\d).{8,}$/, {
        message:
            "¡La contraseña debe contener por lo menos 8 carácteres, incluyendo una mayúscula, una minúscula y un número!",
    }),
    repassword: z.string(),
}).refine(({ password, repassword }) => password === repassword, { message: "Las contraseñas no coinciden" })

type registerSchema = z.infer<typeof registerSchema>;

export default function useRegisterForm(): {
    form: UseFormReturn<registerSchema>;
    onSubmit: (values: registerSchema) => Promise<void>;
    error: string;
    isLoading: boolean;
} {
    const {setId} = useUserStore()
    const [isSuccessfullySubmitted, setIsSuccessfullySubmitted] = React.useState(false);
    const [error, setError] = React.useState("");
    const router = useRouter();
    const form = useForm<registerSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: { email: "", password: "", repassword: "" },
    });

    const onSubmit = async ({ email, password, repassword }: registerSchema): Promise<void> => {
        if (isSuccessfullySubmitted) setIsSuccessfullySubmitted(false);
        const { data } = await api.post("auth/password", { email, password, repassword });
        if (data) {
            setIsSuccessfullySubmitted(true);
            setId(data.id)
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
