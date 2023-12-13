"use client"

import * as React from "react"
import { Activity, PowerOff, Radio, Settings, Volume1 } from "lucide-react"

import useDeviceGraph from "@/hooks/use-device-graph"
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

  if (loading) return <p>...loading</p>
  return (
    <Tabs defaultValue="stadistics">
      <TabsList>
        <TabsTrigger value="stadistics">Estadísticas</TabsTrigger>
        <TabsTrigger value="users">Personas con acceso</TabsTrigger>
      </TabsList>
      <TabsContent value="stadistics" className="space-y-4">
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
                {average ? Math.round(average) + "dB" : "-"}
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
            {active ? (
              <>
                <CardHeader>
                  <h1 className="text-center font-semibold text-lg">
                    Dispositivo
                  </h1>
                </CardHeader>
                <CardContent className="w-full h-full justify-center text-center items-center grid grid-cols-2 grid-rows-3 ">
                  {sensors.map((s, i) => (
                    <p key={i}>{s}</p>
                  ))}
                </CardContent>
              </>
            ) : (
              <>
                <CardHeader>
                  <h1 className="text-center font-semibold text-lg">
                    Dispositivo desconectado
                  </h1>
                </CardHeader>
                <CardContent className="w-full h-full justify-center text-center items-center flex">
                  <PowerOff size={72} />
                </CardContent>
              </>
            )}
          </Card>
          <DeviceGraph categories={categories} formattedData={formattedData} />
        </div>
      </TabsContent>
      <TabsContent value="users" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
      </TabsContent>
      <TabsContent value="users"></TabsContent>
    </Tabs>
  )
}

export default Classroom
