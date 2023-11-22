"use client"

import { useEffect, useState } from "react"
import { AreaChart, Card, Title } from "@tremor/react"

import api from "@/lib/axios"

const customTooltip = ({ payload, active }: { payload: any; active: any }) => {
  if (!active || !payload) return null
  return (
    <div className="w-56 rounded-tremor-default text-foreground bg-background p-2 shadow-tremor-dropdown border border-tremor-border">
      {payload.map((category: any, idx: any) => (
        <div key={idx} className="flex flex-1 space-x-2.5">
          <div
            className={`w-1 flex flex-col bg-${category.color}-500 rounded`}
          />
          <div className="space-y-1">
            <p className="text-tremor-content"></p>
            <p className="font-medium text-tremor-content-emphasis">
              {category.value} db
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

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
