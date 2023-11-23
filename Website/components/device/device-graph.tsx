"use client"

import { useEffect, useState } from "react"
import { AreaChart, Card, Title } from "@tremor/react"

import api from "@/lib/axios"

export default function DeviceGraph({ deviceId }: { deviceId: string }) {
  const [data, setData] = useState<
    | {
        id: number
        sensor1: number
        sensor2: number
        sensor3: number
        sensor4: number
        sensor5: number
        sensor6: number
        created_at: string
        updated_at: string
        device_id: string
      }[]
    | null
  >(null)
  const dataCallback = async () => {
    try {
      const { data } = await api.get("/data/graph/" + deviceId)
      data.data.forEach(
        (d: {
          sensor1: number
          sensor2: number
          sensor3: number
          sensor4: number
          sensor5: number
          sensor6: number
          updated_at: string
        }) => {
          // Obtener la fecha y hora actualizada formateada
          const fechaFormateada = new Intl.DateTimeFormat("es-AR", {
            dateStyle: "medium",
            timeStyle: "medium",
          }).format(new Date(d.updated_at))

          // Reemplazar el valor de updated_at con la fecha formateada
          d.updated_at = fechaFormateada
        }
      )
      setData(data.data)
    } catch (error) {}
  }
  useEffect(() => {
    dataCallback()
  }, [])

  if (data)
    return (
      <Card className="col-span-5 bg-transparent">
        <Title className="text-3xl font-bold">Aula mas ruidosa</Title>
        <AreaChart
          className="mt-4 text-foreground bg-transparent"
          data={data}
          index="updated_at"
          colors={["red", "lime", "blue", "cyan", "violet", "yellow"]}
          categories={[
            "sensor1",
            "sensor2",
            "sensor3",
            "sensor4",
            "sensor5",
            "sensor6",
          ]}
          yAxisWidth={30}
        />
      </Card>
    )
  return <p>loading...</p>
}
