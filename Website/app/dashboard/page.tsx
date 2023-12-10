"use client"

import { useCallback, useEffect, useState } from "react"
import { Volume1 } from "lucide-react"

import api from "@/lib/axios"
import useClassrooms from "@/hooks/use-classrooms"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Graph from "@/components/dashboard/graph"
import { DatePickerWithRange } from "@/components/date-range-picker"
import NoInfo from "@/components/dashboard/no-info"

type DashboardDataType = {
  noisyClassroom: string
  soundLevel: number
  devices: number
  activeDevices: number
} | null

const Dashboard = () => {
  const { classrooms, isLoading } = useClassrooms()
  const [data, setData] = useState<DashboardDataType>(null)
  const dataCallback = useCallback(async () => {
    try {
      const { data } = await api.get("/data/dashboard")
      setData(data.data)
    } catch (error) {}
  }, [data])
  useEffect(() => {
    dataCallback()
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (data)
    return (
      <section className="grid items-start gap-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <DatePickerWithRange />
            <Button>Descargar</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
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
                  <CardTitle className="text-sm font-medium">
                    Aula mas ruidosa
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-speech text-muted-foreground"
                  >
                    <path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20" />
                    <path d="M19.8 17.8a7.5 7.5 0 0 0 .003-10.603" />
                    <path d="M17 15a3.5 3.5 0 0 0-.025-4.975" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">
                    {data.noisyClassroom}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Nivel de sonido
                  </CardTitle>
                  <Volume1 className="text-base text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-semibold">
                    {Math.round(data.soundLevel) + " Db"}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Dispositivos
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{classrooms.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Dispositivos activos
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {classrooms.filter((c) => c.active === true).length}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Graph />
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Tus configuraciones</CardTitle>
                  <h1>Niveles aceptados</h1>
                </CardHeader>
                <CardContent>
                  <CardDescription>Niveles aceptados</CardDescription>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    )
    if(!data){
        return (
        <NoInfo />
        )
    }
}

export default Dashboard
