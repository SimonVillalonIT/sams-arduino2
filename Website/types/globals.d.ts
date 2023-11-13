type Classroom = {
  id: string
  name: string
  active: boolean
  createdAt: string
  updatedAt: string
}

type ClassroomWithData = Classroom & {
  sensor1?: number
  sensor2?: number
  sensor3?: number
  sensor4?: number
  sensor5?: number
  sensor6?: number
}
