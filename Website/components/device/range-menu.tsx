import React from "react"
import { Loader2 } from "lucide-react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

function RangeMenu() {
  const [loading, setLoading] = React.useState(false)
  const [interval, setInterval] = React.useState<string>("2000")
  return (
    <Select value={interval} disabled={loading} onValueChange={setInterval}>
      <SelectTrigger>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {loading ? (
          <Loader2 />
        ) : (
          <>
            <SelectItem value="2000">2 segundos</SelectItem>
            <SelectItem value="20000">20 segundos</SelectItem>
            <SelectItem value="1200000">20 minutos</SelectItem>
          </>
        )}
      </SelectContent>
    </Select>
  )
}

export default RangeMenu
