type User = {
  id: string
  name: string
  email: string
  admin: boolean
  createdAt: string
  updatedAt: string
}

type Sensor = {
    value: number,
    position: number
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
  sensor1?: Sensor
  sensor2?: Sensor
  sensor3?: Sensor
  sensor4?: Sensor
  sensor5?: Sensor
  sensor6?: Sensor
}
