import React from "react"
import useSettingsStore from "@/stores/settings-store"

import { getClassroomColor } from "@/lib/classroom"
import { cn } from "@/lib/utils"
import { HoverCardContent } from "@/components/ui/hover-card"

const CardHover = ({
  sensor1,
  sensor2,
  sensor3,
  sensor4,
  sensor5,
  sensor6,
}: any) => {
  const { settings } = useSettingsStore()
  const sensors = [sensor1, sensor2, sensor3, sensor4, sensor5, sensor6]

  return (
    <HoverCardContent>
      {Math.max(...sensors) <= 0 ? (
        <p className="text-primary text-md">
          Puede que haya un error en los sensores
        </p>
      ) : (
        <ul className="grid grid-cols-2">
          {sensors.map((s, key) => {
            const color = getClassroomColor(s, settings)
            return (
              <li key={key} className="font-bold text-sm">
                S{key + 1}: <span style={{ color }}>{s} dB</span>
              </li>
            )
          })}
        </ul>
      )}
    </HoverCardContent>
  )
}

export default CardHover
