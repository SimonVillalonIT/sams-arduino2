import { useRef } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export interface SensorProps {
  id: any;
  value: number;
  index: number;
  position: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const Sensor = ({ id, value, index, position, moveCard }: SensorProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop<DragItem, void, { isOver: boolean; handlerId: string | null }>({
    accept: "card",
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: () => ({ id, index }),
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

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
  );
};

export default Sensor;
