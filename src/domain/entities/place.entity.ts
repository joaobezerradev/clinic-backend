import { Name, ID } from '@domain/value-objects'
import { Entity } from './entity'

type Schedule = {
  id: string
  startTime: Date
  endTime: Date
  professionalId: string
}

type Room = {
  id: string
  name: string
  schedules: Schedule[]
}

export class Place extends Entity {
  readonly id: ID
  readonly name: Name
  readonly rooms: Room[]

  constructor (params: Partial<Place>) {
    super()
    Object.assign(this, params)
  }

  static create (params: Place.Input): Place {
    return new Place({ id: new ID(), name: new Name(params.name), rooms: [] })
  }
}

export namespace Place {
  export type Input = { name: string }
  export type Output = { id: ID, name: Name, rooms: Room[] }
}
