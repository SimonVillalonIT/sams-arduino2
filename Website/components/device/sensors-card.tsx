import { useCallback, useState } from "react"

import api from "@/lib/axios"

import Sensor, { DragItem } from "./sensor-item"

// Container.js

const numberOfColumns = 2

export const Container = ({
  data,
  deviceId,
}: {
  data: (Sensor | undefined)[]
  deviceId: string
}) => {
  const [cards, setCards] = useState(data)

  const handleUpdate = async (data: (Sensor | undefined)[]) => {
    try {
      await api.post("/device/changeSensor", { data, deviceId })
    } catch (error) {}
  }

  const moveCard = useCallback(async (drag: DragItem, hover: DragItem) => {
    if (drag.position === hover.position) {
      return // No se necesita hacer ningún cambio si las posiciones son iguales
    }

    setCards((prevCards: (Sensor | undefined)[]) => {
      const updatedCards = [...prevCards]
      const dragCard = updatedCards.find(
        (card) => card?.position === drag.position
      )
      const hoverCard = updatedCards.find(
        (card) => card?.position === hover.position
      )

      if (dragCard && hoverCard) {
        const dragIndex = updatedCards.indexOf(dragCard)
        const hoverIndex = updatedCards.indexOf(hoverCard)

        const temp = updatedCards[dragIndex]
        updatedCards[dragIndex] = updatedCards[hoverIndex]
        updatedCards[hoverIndex] = temp

        // Actualizar la propiedad 'posicion' para reflejar los cambios
        updatedCards.forEach((card, index) => {
          if (card) {
            card.position = index + 1 // Ajustar la posición para que comience desde 1
          }
        })

        handleUpdate(updatedCards)
        return updatedCards
      }
      return prevCards
    })
  }, [])

  const renderCard = useCallback(
    (card: Sensor | undefined, i: number) => {
      if (!card) return null
      return (
        <Sensor
          index={i}
          key={i}
          id={i}
          value={card.value}
          position={card.position}
          moveCard={moveCard}
        />
      )
    },
    [moveCard]
  )

  return (
    <div className="grid grid-cols-2 shadow-m, id shadow-base-300/70 w-full h-full">
      {cards.map((card, i) => renderCard(card, i))}
    </div>
  )
}

export default Container
