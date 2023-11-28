import { create } from "zustand"

type Data = {
  updated_at: string
  [key: string]: number | string // Additional sensors with string keys
}

interface store {
  data: Data[] | null
  setData: (data: Data[]) => void
  formattedData: any
  setFormattedData: (data: Data[]) => void
  interval: string
  setInterval: (interval: string) => void
}

const useDeviceGraphStore = create<store>((set) => ({
  data: null,
  setData: (data) => set({ data }),
  formattedData: null,
  setFormattedData: (data) => set({ data }),
  interval: "2000",
  setInterval: (interval) => set({ interval }),
}))

export default useDeviceGraphStore
