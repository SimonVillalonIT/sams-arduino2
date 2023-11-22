import {
  AlertCircle,
  Annoyed,
  Frown,
  LucideIcon,
  PowerOff,
  Smile,
} from "lucide-react"

import { Card, CardContent, CardTitle } from "@/components/ui/card"

import { HoverCard, HoverCardTrigger } from "../ui/hover-card"
import CardHover from "./card-hover"
import OptionsMenu from "./options-menu"

const ClassroomCard = ({
  id,
  name,
  admin,
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
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card className="py-6 w-full h-80 relative flex flex-col justify-between items-center">
          {admin ? <OptionsMenu.admin id={id} /> : <OptionsMenu id={id} />}
          <CardContent className="grid grid-rows-3 justify-center items-center h-full">
            {noisiest >= 45 ? (
              <Frown size={48} className="row-start-2" />
            ) : noisiest <= 45 && noisiest >= 20 ? (
              <Annoyed size={48} className="row-start-2" />
            ) : noisiest >= 1 ? (
              <Smile size={48} className="row-start-2" />
            ) : (
              <AlertCircle size={48} className="row-start-2" />
            )}
            <span className="row-start-3 self-end text-center">{noisiest}</span>
          </CardContent>
          <CardTitle>{name}</CardTitle>
        </Card>
      </HoverCardTrigger>
      <CardHover
        sensor1={sensor1}
        sensor2={sensor2}
        sensor3={sensor3}
        sensor4={sensor4}
        sensor5={sensor5}
        sensor6={sensor6}
      />
    </HoverCard>
  )
}

ClassroomCard.unactive = ({ id, name, admin }: Classroom) => (
  <Card className="py-6 w-full h-80 relative flex flex-col justify-between items-center opacity-50">
    {admin ? <OptionsMenu.admin id={id} /> : <OptionsMenu id={id} />}
    <CardContent className="flex flex-col h-full items-center justify-center">
      <PowerOff size={48} />
    </CardContent>
    <CardTitle className="justify-self-end">{name}</CardTitle>
  </Card>
)

export default ClassroomCard
