import { useCallback, useEffect, useState } from "react"
import useDeviceGraphStore from "@/stores/device-graph-store"

import api from "@/lib/axios"
import { processData } from "@/lib/classroom"

export default function useDeviceGraph(deviceId: string) {
  /*const {
    formattedData,
    setFormattedData,
    data,
    setData,
    setInterval,
    interval,
  } = useDeviceGraphStore()*/
  const [data,setData] = useState<any>(null)
  const [formattedData,setFormattedData] = useState<any>(null)
  const [interval,setInterval] = useState("2000")
  const [loading, setLoading] = useState(true)
  const dataCallback = async () => {
    try {
      const { data } = await api.get("/data/graph/" + deviceId)
      setData(data.data)
      const result:any = processData(data.data, 1000 * 60 * 10)
      setFormattedData(result)
      setLoading(false)
    } catch (error) {}
  }

  useEffect(() => {
    dataCallback()
  }, [])

  const handleIntervalChange = (interval: string) => {
    setLoading(true)
    setInterval(interval)
    if(data) {
    const result = processData(data, Number(interval))
    setFormattedData(result)
    setLoading(false)
    }
      }

  return { formattedData, loading, interval, handleIntervalChange }
}
