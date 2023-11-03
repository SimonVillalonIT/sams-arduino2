import { create } from "zustand"
import { persist } from "zustand/middleware"

interface useUserStore {
    id: string | null
    setId: (id: string) => void
}

const useUserStore = create(persist<useUserStore>((set) => ({
    id: null,
    setId: (id) => set({ id })
}), { name: "user-store" }))

export default useUserStore
