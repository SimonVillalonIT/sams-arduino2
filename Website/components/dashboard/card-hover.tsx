import React from "react"

import { HoverCardContent } from "@/components/ui/hover-card"

const CardHover = ({
  sensor1,
  sensor2,
  sensor3,
  sensor4,
  sensor5,
  sensor6,
}) => {
  const sensors = [sensor1, sensor2, sensor3, sensor4, sensor5, sensor6]
  const condition = (v: number) => {
    if (v >= 45) return "text-destructive"
    if (v <= 44 && v >= 20) return "text-yellow-300"
    if (v <= 19) return "text-primary"
  }
  return (
    <HoverCardContent>
      {Math.max(...sensors) <= 0 ? (
        <p className="text-primary text-md">
          Puede que haya un error en los sensores
        </p>
      ) : (
        <ul className="grid grid-cols-2">
          {sensors.map((s, key) => (
            <li className="font-bold text-sm">
              S{key + 1}: <span className={condition(s)}>{s} dB</span>
            </li>
          ))}
        </ul>
      )}
    </HoverCardContent>
  )
}

export default CardHover
