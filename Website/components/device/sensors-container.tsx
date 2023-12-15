import React from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import SensorsCard from "./sensors-card"

interface SensorsContainerInterface {
  sensors: (Sensor | undefined)[]
}

function SensorsContainer({ sensors }: SensorsContainerInterface) {
  return (
    <DndProvider backend={HTML5Backend}>
        <SensorsCard data={sensors} />
    </DndProvider>
  )
}

export default SensorsContainer
