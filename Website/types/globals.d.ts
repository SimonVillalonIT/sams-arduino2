type User = {
  id: string
  name: string
  email: string
  admin: boolean
  createdAt: string
  updatedAt: string
}

type Classroom = {
  id: string
  name: string
  active: boolean
  admin: boolean
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
