"use client"

import { useEffect, useState } from "react"
import useDateStore from "@/stores/date-store"
import { AreaChart, Card, Title } from "@tremor/react"

import api from "@/lib/axios"

export default function Graph() {
  const [data, setData] = useState<
    { Fecha: string; Decibeles: number }[] | null
  >(null)
  const { date } = useDateStore()
  const from = date?.from as Date
  const to = date?.to as Date
  const dataCallback = async () => {
    try {
      const { data } = await api.get<{
        data: { updated_at: string; soundLevel: number }[]
      }>("/data/graph")

      const filteredData = data.data.filter((item) => {
        const itemDate = new Date(item.updated_at)
        return itemDate >= from && itemDate <= to
      })
      const formattedData: { Fecha: string; Decibeles: number }[] =
        filteredData.map(
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
              Fecha: formattedDate,
              Decibeles: Math.round(soundLevel),
            }
          }
        )

      setData(formattedData) // Establece los datos filtrados en el estado
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    dataCallback()
  }, [date])

  if (data) {
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
  }
  return <p>loading...</p>
}
