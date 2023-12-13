import { useEffect, useState } from "react"

import api from "@/lib/axios"
import { processData } from "@/lib/classroom"
import { useToast } from "@/components/ui/use-toast"

export type Categories = {
  sensor1: boolean
  sensor2: boolean
  sensor3: boolean
  sensor4: boolean
  sensor5: boolean
  sensor6: boolean
}

export default function useDeviceGraph(deviceId: string) {
  const [data, setData] = useState<any>(null)
  const [formattedData, setFormattedData] = useState<any>(null)
  const [interval, setInterval] = useState("2000")
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<Categories>({
    sensor1: true,
    sensor2: true,
    sensor3: true,
    sensor4: true,
    sensor5: true,
    sensor6: true,
  })
  const { toast } = useToast()
  const dataCallback = async () => {
    try {
      const { data } = await api.get("/data/graph/" + deviceId)
      setData(data.data)
      setFormattedData(data.data)
      setLoading(false)
    } catch (error) {}
  }

  useEffect(() => {
    dataCallback()
  }, [])

  const handleIntervalChange = (interval: string) => {
    setLoading(true)
    if (data) {
      if (interval === "2000") {
        setFormattedData(data)
        setInterval(interval)
        setLoading(false)
      }
      const result = processData(data, Number(interval))
      if (result.length > 5) {
        setFormattedData(result)
        setInterval(interval)
        setLoading(false)
      } else {
        toast({
          title: "No hay suficiente informacion",
          variant: "destructive",
        })
        setLoading(false)
        return
      }
    }
  }

  return {
    formattedData,
    loading,
    interval,
    handleIntervalChange,
    categories,
    setCategories,
  }
}
