import { useRef } from "react"
import { AlertCircle } from "lucide-react"
import { DropTargetMonitor, useDrag, useDrop } from "react-dnd"

import { cn } from "@/lib/utils"

export interface SensorProps {
  id: any
  value: number
  index: number
  position: number
  moveCard: (drag: DragItem, hover: DragItem) => void
}

export interface DragItem {
  index: number
  id: string
  type?: string
  position: number
}

const Sensor = ({ id, value, index, position, moveCard }: SensorProps) => {
  const ref = useRef<HTMLDivElement>(null)

  const [, drop] = useDrop<
    DragItem,
    void,
    { isOver: boolean; handlerId: string | null }
  >({
    accept: "card",
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) return

      const drag = item
      const hover = { id, value, index, position }

      if (drag.position === hover.position) return

      const hoverBoundingRect = ref.current.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top

      if (drag.position < drag.position && hoverClientY < hoverMiddleY) return
      if (drag.position > hover.position && hoverClientY > hoverMiddleY) return

      moveCard(drag, hover)
      item.position = hover.position
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => ({ id, position }),
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <div
      ref={ref}
      className={cn(
        "flex justify-center items-center border border-base-200 text-primary-content select-none",
        isDragging ? "opacity-0" : "opacity-100"
      )}
    >
      {value === 0 ? <AlertCircle /> : value}
    </div>
  )
}

export default Sensor
