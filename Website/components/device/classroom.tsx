import { PowerOff, Radio, Volume1 } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DeviceGraph from "@/components/device/device-graph"

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
              <CardTitle className="text-lg font-medium">{name}</CardTitle>
              <Radio size={24} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold"></div>
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
                {active ??
                  (sensor1 + sensor2 + sensor3 + sensor4 + sensor5 + sensor6) /
                    6}
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
            <CardContent></CardContent>
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
              <div className="text-2xl font-bold"></div>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <DeviceGraph deviceId={id} />
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
  )
}

export default Classroom
