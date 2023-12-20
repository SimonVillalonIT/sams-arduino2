import { DateRange } from "react-day-picker"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Store {
  date: DateRange | undefined
}

interface Actions {
  setDate: (data: DateRange | undefined) => void
}

function getFecha20DiasAntes(): Date {
  const fechaActual = new Date()
  fechaActual.setDate(fechaActual.getDate() - 1)
  return fechaActual
}
const fromDate = getFecha20DiasAntes()
const useDateStore = create<Store & Actions>((set) => ({
  date: { from: fromDate, to: new Date(Date.now()) },
  setDate: (data) =>
    set((state) => ({
      ...state,
      date: { from: data?.from, to: data?.to },
    })),
}))

export default useDateStore
