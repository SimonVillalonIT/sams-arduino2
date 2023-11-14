import { useEffect, useState } from "react"
import useUserStore from "@/stores/userStore"
import io from "socket.io-client"

import api from "@/lib/axios"

let socket: any

export default function useClassroom() {
  const user = useUserStore()

  const [classrooms, setClassrooms] = useState<
    Classroom[] | ClassroomWithData[]
  >([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const getClassrooms = async () => {
    try {
      const { data } = await api.get("/device/")
      type RawClassroom = Classroom & {
        "user-device": { admin: boolean }
      }
      data.data = data.data.map((item: RawClassroom) => {
        // Extract values
        const {
          name,
          active,
          id,
          createdAt,
          updatedAt,
          "user-device": { admin },
        } = item

        // Create a new object with the desired structure
        return { id, name, active, admin, createdAt, updatedAt }
      })
      setClassrooms(data.data)
      console.log(data.data)
      setIsLoading(false)
    } catch (error: any) {
      setError("No se encontraron dispositivos")
      setIsLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    getClassrooms()
  }, [])

  const socketInitializer = () => {
    socket = io("http://localhost:8080")

    socket.on("connect", () => {
      socket.emit("user", { id: user.id })
    })
    socket.on(
      "deviceUpdate",
      (data: {
        id: string
        sensor1: number
        sensor2: number
        sensor3: number
        sensor4: number
        sensor5: number
        sensor6: number
      }) => {
        setClassrooms((prevState) => {
          const newState = [...prevState] // Create a new array reference

          const index = newState.findIndex((item) => item.id === data.id)

          if (index !== -1) {
            // Spread the existing values along with the updated ones
            newState[index] = {
              ...newState[index],
              active: true,
              sensor1: data.sensor1,
              sensor2: data.sensor2,
              sensor3: data.sensor3,
              sensor4: data.sensor4,
              sensor5: data.sensor5,
              sensor6: data.sensor6,
            }
            console.log("Updated State:", newState)
          } else {
            console.warn("Item not found in state with ID:", data.id)
          }

          return newState
        })
      }
    )

    socket.on("deviceDisconnected", (id: string) => {
      setClassrooms((prevState: Classroom[] | ClassroomWithData[]) => {
        const newState = [...prevState] // Create a new array reference

        const index = newState.findIndex((item) => item.id === id)

        if (index !== -1) {
          // Spread the existing values along with the updated ones
          newState[index] = {
            id: newState[index].id,
            name: newState[index].name,
            active: false,
            createdAt: newState[index].createdAt,
            updatedAt: newState[index].updatedAt,
            admin: newState[index].admin
          }
          console.log("Updated State:", newState)
        } else {
          console.warn("Item not found in state with ID:", id)
          setError("Error en la actualizacion de dispositivos")
        }

        return newState
      })
    })
  }

  useEffect(() => socketInitializer(), [])

  return { classrooms, isLoading, error }
}
