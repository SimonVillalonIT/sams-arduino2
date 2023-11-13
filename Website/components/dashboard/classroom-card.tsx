import { Card, CardContent, CardTitle } from "@/components/ui/card"

import OptionsMenu from "./options-menu"

const ClassroomCard = ({
  id,
  name,
  sensor1,
  sensor2,
  sensor3,
  sensor4,
  sensor5,
  sensor6,
}: ClassroomWithData) => {
  const sensors = [sensor1, sensor2, sensor3, sensor4, sensor5, sensor6] // or undefined

  const cleanSensors = sensors.filter(
    (sensor) => sensor !== undefined
  ) as number[]
  const noisiest = Math.max(...cleanSensors)
  return (
    <Card className="w-64 h-80 relative">
      <CardContent>
        <OptionsMenu id={id} />
        {noisiest}
      </CardContent>
      <CardTitle>{name}</CardTitle>
    </Card>
  )
}

ClassroomCard.unactive = ({ id, name }: Classroom) => (
  <Card className="w-64 h-80 relative">
    <CardContent>
      <OptionsMenu id={id} />
      <p>El dispositivo esta apagado</p>
    </CardContent>
    <CardTitle>{name}</CardTitle>
  </Card>
)

export default ClassroomCard
