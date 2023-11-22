"use client"

import { notFound } from "next/navigation"
import useClassroom from "@/hooks/use-classrooms"
import Classroom from "@/components/device/classroom"

function DevicePage({ params }: { params: { id: string } }) {
  const { isLoading, classrooms } = useClassroom()
  const classroom = classrooms.filter((c) => c.id === params.id)[0]

  if (isLoading) return <p>Loading...</p>
  if (!classroom) return notFound()
  return (
    <section className="w-full mb-4">
      <Classroom {...classroom} />
    </section>
  )
}

export default DevicePage
