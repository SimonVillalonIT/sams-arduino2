import { AreaChart, Card, Title } from "@tremor/react"

export default function DeviceGraph({
  formattedData,
  categories,
}: {
  formattedData: any
  categories: {
    sensor1: boolean
    sensor2: boolean
    sensor3: boolean
    sensor4: boolean
    sensor5: boolean
    sensor6: boolean
  }
}) {
  type colors = (
    | "red"
    | "lime"
    | "blue"
    | "cyan"
    | "violet"
    | "yellow"
    | "slate"
    | "gray"
    | "zinc"
    | "neutral"
    | "stone"
    | "orange"
    | "amber"
    | "green"
    | "emerald"
    | "teal"
    | "sky"
    | "indigo"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose"
  )[]
  const colors: colors = ["red", "lime", "blue", "cyan", "violet", "yellow"]
  const clearCategories: string[] = []
  const clearColors: colors = []
  Object.entries(categories).forEach((category, i) => {
    if (category[1] === true) {
      clearCategories.push(category[0])
      clearColors.push(colors[i])
    }
  })

  return (
    <Card className="col-span-5 bg-transparent">
      <Title className="text-3xl font-bold">Aula mas ruidosa</Title>
      <AreaChart
        className="mt-4 text-foreground bg-transparent"
        data={formattedData}
        index="Fecha"
        colors={clearColors}
        categories={clearCategories}
        yAxisWidth={30}
      />
    </Card>
  )
}
