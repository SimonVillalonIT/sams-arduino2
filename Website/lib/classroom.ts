import * as z from "zod"

import api from "./axios"

export const deleteClassroom = (id: string) => {
  console.log(id)
}

const regexUUIDv4 =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export const createSchema = z.object({
  deviceId: z
    .string({ required_error: "El nombre es obligatorio" })
    .refine((input) => regexUUIDv4.test(input), {
      message: "Debes ingresar un id válido",
    }),
  name: z
    .string({ required_error: "El id es obligatorio" })
    .min(3, { message: "El nombre debe tener por lo menos 3 caracteres" }),
})

export const handleCreateSubmit = async (
  fields: z.infer<typeof createSchema>
) => {
  try {
    const { data } = await api.post("/device/link", fields)
    return data
  } catch (error: any) {
    return error.response.data
  }
}

export const getAverageSensors = (sensors: (number | undefined)[]) => {
  const filteredSensors = sensors.filter((value) => value !== null) as number[]
  const average =
    filteredSensors.reduce((a, b) => a + b, 0) / filteredSensors.length
  return average
}
