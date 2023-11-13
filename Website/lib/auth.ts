import * as z from "zod"

import api from "@/lib/axios"

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "¡El formato del correo electrónico es inválido!" }),
  password: z.string().min(8, {
    message: "¡La contraseña debe tener por lo menos 8 caractéres!",
  }),
})

export const handleLoginSubmit = async (
  fields: z.infer<typeof loginSchema>
) => {
  try {
    const { data } = await api.post("auth/login", fields)
    return data
  } catch (error: any) {
    return error.response.data
  }
}

export const registerSchema = z
  .object({
    name: z.string().min(3, {message: "El nombre debe tener 3 caracteres"}).max(20, {message:"El nombre no debe superar los 20 caracteres"}),
    email: z
      .string()
      .email({ message: "¡El formato del correo electrónico es inválido!" }),
    password: z.string().min(8, {
    message: "¡La contraseña debe tener por lo menos 8 caractéres!",
  }),
    repassword: z.string(),
  })
  .refine(({ password, repassword }) => password === repassword, {
    message: "Las contraseñas no coinciden",
  })

export const handleRegisterSubmit = async (
  fields: z.infer<typeof registerSchema>
) => {
  try {
    const { data } = await api.post("auth/register", fields)
    return data
  } catch (error: any) {
    return error.response.data
  }
}

export const handleLogOut = async () => {
    await api.get("auth/logout")
  }
