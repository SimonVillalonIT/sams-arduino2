import * as z from "zod"

import api from "./axios"

export const deleteClassroom = (id: string) => {
  console.log(id)
}

const regexUUIDv4 =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export const createSchema = z.object({
  deviceId: z
    .string({ required_error: "El id es obligatorio" })
    .refine((input) => regexUUIDv4.test(input), {
      message: "Debes ingresar un id válido",
    }),
  name: z
    .string({ required_error: "El nombre es obligatorio" })
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

interface GroupedData {
  updated_at: string
  [key: string]: number | string // Additional sensors with string keys
}

interface SensorData {
  updated_at: string
  [key: string]: number | string // Additional sensors with string keys
}

export const processData = (
  data: SensorData[],
  interval: number
): GroupedData[] => {
  const groupedData: { [key: number]: GroupedData } = {}

  data.forEach((item: SensorData) => {
    const date: Date = new Date(item.updated_at)
    const roundedTime: number = Math.floor(date.getTime() / interval) * interval

    if (!groupedData[roundedTime]) {
      groupedData[roundedTime] = {
        updated_at: date.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      }
    }
    // Calculate sensor averages
    Object.keys(item).forEach((key: string) => {
      if (key !== "updated_at" && key.startsWith("sensor")) {
        const sensors: GroupedData = groupedData[roundedTime]
        sensors[key] = Number(sensors[key])
          ? Math.round((Number(sensors[key]) + Number(item[key])) / 2)
          : Math.round(Number(item[key]))
      }
    })
  })

  return Object.values(groupedData)
}
