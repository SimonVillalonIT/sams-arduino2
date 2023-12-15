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

export const getClassroomColor = (
  value: number,
  settings: { "max-accepted": number; "max-warning": number }
) => {
  let r, g, b

  if (value <= settings["max-accepted"]) {
    // Calculate transition from green to yellow
    const rGreen = 22
    const gGreen = 163
    const bGreen = 74

    const rYellow = 233
    const gYellow = 213
    const bYellow = 2

    const percentGreen = value / settings["max-accepted"]
    const percentYellow = 1 - percentGreen

    r = Math.round(rGreen * percentYellow + rYellow * percentGreen)
    g = Math.round(gGreen * percentYellow + gYellow * percentGreen)
    b = Math.round(bGreen * percentYellow + bYellow * percentGreen)
  } else if (value <= settings["max-warning"]) {
    // Calculate transition from yellow to red
    const rYellow = 233
    const gYellow = 213
    const bYellow = 2

    const rRed = 255
    const gRed = 0
    const bRed = 0

    const percentYellow =
      1 -
      (value - settings["max-accepted"]) /
        (settings["max-warning"] - settings["max-accepted"])
    const percentRed = 1 - percentYellow

    r = Math.round(rYellow * percentYellow + rRed * percentRed)
    g = Math.round(gYellow * percentYellow + gRed * percentRed)
    b = Math.round(bYellow * percentYellow + bRed * percentRed)
  } else {
    // Value exceeds max-warning, return pure red
    r = 255
    g = 0
    b = 0
  }

  // Format resulting color to hexadecimal
  const color = `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`

  return color.toUpperCase() // Convert color to uppercase
}
