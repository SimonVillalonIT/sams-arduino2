"use client"
import * as React from "react"
import { PowerOff, Radio, Settings, UserIcon, Volume1 } from "lucide-react"

import useDeviceGraph from "@/hooks/useDeviceGraph"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DeviceGraph from "@/components/device/device-graph"

import RangeMenu from "./range-menu"
import { allowedNodeEnvironmentFlags } from "process"
import api from "@/lib/axios"

function Classroom({
  id,
  name,
  admin,
  active,
  sensor1,
  sensor2,
  sensor3,
  sensor4,
  sensor5,
  sensor6,
}: ClassroomWithData) {
  const sensors: (number | undefined)[] = [
    sensor1,
    sensor2,
    sensor3,
    sensor4,
    sensor5,
    sensor6,
  ]
  const filteredSensors = sensors.filter((value) => value !== null) as number[]
  const average =
    filteredSensors.reduce((a, b) => a + b, 0) / filteredSensors.length
  const { formattedData, interval, handleIntervalChange, loading } = useDeviceGraph(id)
  const [allowedPeople, setAllowedPeople] = React.useState<number | null>(null)

  const fetchAllowedPeople = async() => {
    const {data} = await api.get(`/device/deviceUsers/${id}`)
    setAllowedPeople(data.data.length + 1)
    console.log({data:data.data.length + 1})
  }

  React.useEffect(()=>{fetchAllowedPeople()},[])
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics" disabled>
          Analytics
        </TabsTrigger>
        <TabsTrigger value="reports" disabled>
          Reports
        </TabsTrigger>
        <TabsTrigger value="notifications" disabled>
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nombre</CardTitle>
              <Radio size={24} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{name}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Nivel de sonido
              </CardTitle>
              <Volume1 />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">
                {average ? average + "dB" : "-"}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Personas con acceso
              </CardTitle>
              <UserIcon size={24} />
            </CardHeader>
            <CardContent className="text-2xl font-semibold">{allowedPeople ?? "-"}</CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Agrupar cada
              </CardTitle>
              <Settings />
            </CardHeader>
            <CardContent>
              <RangeMenu
                interval={interval}
                handleInterval={handleIntervalChange}
                loading={loading}
              />
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-2 flex flex-col">
            <CardHeader>
              <h1>Dispositivo</h1>
            </CardHeader>
            <CardContent className="w-full h-full justify-center text-center items-center grid grid-cols-2 grid-rows-3 ">
              {sensors.map((s) => (
                <p key={s}>{s}</p>
              ))}
            </CardContent>
          </Card>
          <DeviceGraph formattedData={formattedData} />
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default Classroom
