import { create } from "zustand"
import { persist } from "zustand/middleware"

import api from "@/lib/axios"

interface Store {
  settings: { "max-accepted": number; "max-warning": number }
}

interface Actions {
  setSettings: (s: { "max-warning": number; "max-accepted": number }) => void
  fetch: () => Promise<void>
}

const useSettingsStore = create(
  persist<Store & Actions>(
    (set, get) => ({
      settings: { "max-accepted": 20, "max-warning": 30 },
      setSettings: (s) => {
        set((state) => ({ ...state, settings: s }))
      },
      fetch: async () => {
        try {
          const { data } = await api.get<{
            data: {
              id: number
              max_warning: number
              max_accepted: number
              createdAt: string
              updatedAt: string
              userId: string
            }
          }>("/settings")
          get().setSettings({"max-accepted":data.data["max_accepted"], "max-warning": data.data["max_warning"]})
        } catch (error) {
          console.log(error)
        }
      }
    }),
    { name: "settings-store" }
  )
)

export default useSettingsStore
