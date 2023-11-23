"use client"

import { Loader } from "lucide-react"

import useClassrooms from "@/hooks/use-classrooms"
import ClassroomCard from "@/components/dashboard/classroom-card"
import Container from "@/components/dashboard/container"

const Dashboard = () => {
  const { classrooms, error, isLoading } = useClassrooms()

  if (isLoading)
    return <Loader className="animate-spin self-center justify-self-center" />

  if (error) return <h1>{error}</h1>

  if (classrooms)
    return (
      <Container>
        {classrooms.length > 0 ? (
          classrooms.map((classroom) =>
            classroom.active ? (
              <ClassroomCard key={classroom.id} {...classroom} />
            ) : (
              <ClassroomCard.unactive {...classroom} />
            )
          )
        ) : (
          <p>No tiene aulas</p>
        )}
      </Container>
    )
}

export default Dashboard
