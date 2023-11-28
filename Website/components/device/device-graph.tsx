import { AreaChart, Card, Title } from "@tremor/react"

export default function DeviceGraph({ formattedData }: { formattedData: any }) {
  return (
    <Card className="col-span-5 bg-transparent">
      <Title className="text-3xl font-bold">Aula mas ruidosa</Title>
      <AreaChart
        className="mt-4 text-foreground bg-transparent"
        data={formattedData}
        index="updated_at"
        colors={["red", "lime", "blue", "cyan", "violet", "yellow"]}
        categories={[
          "sensor1",
          "sensor2",
          "sensor3",
          "sensor4",
          "sensor5",
          "sensor6",
        ]}
        yAxisWidth={30}
      />
    </Card>
  )
}
