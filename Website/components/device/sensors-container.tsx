import React from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import SensorsCard from "./sensors-card"

interface SensorsContainerInterface {
  sensors: (Sensor | undefined)[]
}

function SensorsContainer({ sensors }: SensorsContainerInterface) {
  const sensorsWithID = sensors.map((s, i) => ({ ...s, id: i }))
  const sortFunction = (
    a: (Sensor & { id: number }) | undefined,
    b: (Sensor & { id: number }) | undefined
  ) => {
    if (!a || !b) return 0
    if (a.position < b.position) {
      return -1
    }
    if (a.position > b.position) {
      return 1
    }

    return 0
  }
  sensorsWithID.sort(sortFunction)
  return (
    <DndProvider backend={HTML5Backend}>
      <SensorsCard data={sensors} />
    </DndProvider>
  )
}

export default SensorsContainer
