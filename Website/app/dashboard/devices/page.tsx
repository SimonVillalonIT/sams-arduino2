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
        <div className="flex">
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
        </div>
        <ClassroomCard
          id="asdasdasdas"
          name="test"
          admin={true}
          active={true}
          updatedAt="2023-2-12"
          createdAt="2023-2-12"
          sensor1={0}
          sensor2={0}
          sensor3={0}
          sensor4={0}
          sensor5={0}
          sensor6={0}
        />
      </Container>
    )
}

export default Dashboard
