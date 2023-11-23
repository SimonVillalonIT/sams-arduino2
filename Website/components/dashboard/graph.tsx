"use client"

import { useEffect, useState } from "react"
import { AreaChart, Card, Title } from "@tremor/react"

import api from "@/lib/axios"

export default function Graph() {
  const [data, setData] = useState<
    { Fecha: string; Decibeles: number }[] | null
  >(null)
  const dataCallback = async () => {
    try {
      const { data } = await api.get("/data/graph")
      const formattedData: { Fecha: string; Decibeles: number }[] =
        data.data.map(
          ({
            updated_at,
            soundLevel,
          }: {
            updated_at: string
            soundLevel: number
          }) => {
            const formattedDate = new Intl.DateTimeFormat("es-AR", {
              dateStyle: "medium",
              timeStyle: "medium",
            }).format(new Date(updated_at))
            return {
              Fecha: formattedDate, // La fecha y hora del sensor
              Decibeles: soundLevel, // El nivel de sonido promedio para esa fecha y hora
            }
          }
        )
      setData(formattedData)
    } catch (error) {}
  }
  useEffect(() => {
    dataCallback()
  }, [])

  if (data)
    return (
      <Card className="col-span-4 bg-transparent">
        <Title className="text-3xl font-bold">Aula mas ruidosa</Title>
        <AreaChart
          className="mt-4 text-foreground bg-transparent"
          data={data}
          index="Fecha"
          categories={["Decibeles"]}
          yAxisWidth={30}
        />
      </Card>
    )
  return <p>loading...</p>
}
