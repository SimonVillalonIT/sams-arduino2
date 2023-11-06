import * as z from "zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation";
import useUserStore from "@/stores/userStore";

const loginSchema = z.object({
    email: z.string().email({ message: "¡El formato del correo electrónico es inválido!" }),
    password: z.string().min(8, { message: "¡La contraseña debe tener por lo menos 8 caractéres!" }),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function useLoginForm(): {
    form: UseFormReturn<LoginSchema>;
    onSubmit: (values: LoginSchema) => any;
    error: Error | null;
    isPending: boolean;
} {
    const router = useRouter()
    const { setId } = useUserStore()
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    const { mutate, isPending, error } = useMutation({
        mutationFn: async (fields: LoginSchema) => {
            try {
                const { data } = await api.post("auth/login", fields);
                return data
            } catch (error: any) {
                if (error.response.data.error) throw new Error(error.response.data.error)
            }
        },
        onSuccess: ({ id }) => {
            setId(id)
            router.refresh()
        },
    })

    const onSubmit = async (fields: LoginSchema): Promise<void> => {
        mutate(fields)
        form.reset()
    };

    return {
        form,
        onSubmit,
        error,
        isPending
    };
}
