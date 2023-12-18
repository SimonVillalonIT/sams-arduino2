import React from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

import SensorsCard from "./sensors-card"

interface SensorsContainerInterface {
  sensors: (Sensor | undefined)[]
  deviceId: string
}

function SensorsContainer({ sensors, deviceId }: SensorsContainerInterface) {
  sensors.sort((a, b) => (a?.position as number) - (b?.position as number))
  return (
    <DndProvider backend={HTML5Backend}>
      <SensorsCard deviceId={deviceId} data={sensors} />
    </DndProvider>
  )
}

export default SensorsContainer
