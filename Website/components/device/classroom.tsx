"use client"

import * as React from "react"
import { Activity, PowerOff, Radio, Settings, Volume1 } from "lucide-react"

import useDeviceGraph from "@/hooks/useDeviceGraph"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DeviceGraph from "@/components/device/device-graph"

import { GraphFilter } from "./graph-filter"
import RangeMenu from "./range-menu"

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
  const {
    formattedData,
    interval,
    handleIntervalChange,
    loading,
    categories,
    setCategories,
  } = useDeviceGraph(id)

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
                Filtrar sensores
              </CardTitle>
              <Activity size={24} />
            </CardHeader>
            <CardContent className="text-2xl font-semibold">
              <GraphFilter
                categories={categories}
                setCategories={setCategories}
              />
            </CardContent>
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
          <DeviceGraph categories={categories} formattedData={formattedData} />
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default Classroom
