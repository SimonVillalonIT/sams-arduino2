"use client"

import * as React from "react"
import useSettingsStore from "@/stores/settings-store"
import { Activity, PowerOff, Radio, Settings, Volume1 } from "lucide-react"

import { getClassroomColor } from "@/lib/classroom"
import useDeviceGraph from "@/hooks/use-device-graph"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DeviceGraph from "@/components/device/device-graph"

import { DatePickerWithRange } from "../date-range-picker"
import { GraphFilter } from "./graph-filter"
import RangeMenu from "./range-menu"
import SensorsContainer from "./sensors-container"
import UsersTable from "./users-table"

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
  const { settings } = useSettingsStore()
  const sensors: (Sensor | undefined)[] = [
    sensor1,
    sensor2,
    sensor3,
    sensor4,
    sensor5,
    sensor6,
  ]
  const filteredSensors = sensors
    .filter((sensor) => sensor?.value !== null)
    .map((sensor) => sensor?.value) as number[]
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

  const color = average ? getClassroomColor(average, settings) : ""

  if (loading) return <p>...loading</p>
  return (
    <Tabs defaultValue="stadistics">
      <div className="flex justify-between">
        <TabsList>
          <TabsTrigger value="stadistics">Estadísticas</TabsTrigger>
          <TabsTrigger disabled={!admin} value="users">
            Personas con acceso
          </TabsTrigger>
        </TabsList>
        <DatePickerWithRange />
      </div>
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
              <div className="text-2xl font-semibold" style={{ color }}>
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
          <Card className="col-span-2 p-0 flex flex-col w-full h-full">
            {active ? (
              <>
                <CardHeader>
                  <h1 className="text-center font-semibold text-lg">
                    Dispositivo
                  </h1>
                </CardHeader>
                <CardContent className="p-0 justify-center text-center items-center flex h-full">
                  <SensorsContainer deviceId={id} sensors={sensors} />
                </CardContent>
              </>
            ) : (
              <>
                <CardHeader>
                  <h1 className="text-center font-semibold text-lg">
                    Dispositivo desconectado
                  </h1>
                </CardHeader>
                <CardContent className="p-0 justify-center text-center items-center flex h-full">
                  <PowerOff size={72} />
                </CardContent>
              </>
            )}
          </Card>
          <DeviceGraph categories={categories} formattedData={formattedData} />
        </div>
      </TabsContent>
      <TabsContent value="users">
        <UsersTable deviceId={id} />
      </TabsContent>
    </Tabs>
  )
}

export default Classroom
