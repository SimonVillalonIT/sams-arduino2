import React from "react"
import { Loader2 } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

function RangeMenu({
  interval,
  handleInterval,
  loading,
}: {
  interval: string
  handleInterval: (interval: string) => void
  loading: boolean
}) {
  return (
    <Select value={interval} disabled={loading} onValueChange={handleInterval}>
      <SelectTrigger>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {loading ? (
          <Loader2 />
        ) : (
          <>
            <SelectItem value="2000">Tiempo real</SelectItem>
            <SelectItem value="300000">5 minutos</SelectItem>
            <SelectItem value="1800000">30 minutos</SelectItem>
            <SelectItem value="3600000">1 hora</SelectItem>
            <SelectItem value="86400000">1 dia</SelectItem>
          </>
        )}
      </SelectContent>
    </Select>
  )
}

export default RangeMenu
