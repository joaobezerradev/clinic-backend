import { Entity, Room } from '@domain/entities'
import { CustomError } from '@domain/errors'
import { ID, Name } from '@domain/value-objects'

export class Place extends Entity {
  readonly name: Name
  readonly rooms: Room[]

  constructor (params: Partial<Place>) {
    super()
    Object.assign(this, params)
  }

  static create (params: Place.Input): Place {
    return new Place({ id: new ID(), name: new Name(params.name), rooms: [] })
  }

  addRoom (name: string): CustomError | null {
    const foundRoom = this.rooms.find(room => room.name.value.toLowerCase() === name.toLowerCase())
    if (foundRoom) {
      return new CustomError('Room already exists', 'name', name)
    }

    this.rooms.push(Room.create({ name }))
    return null
  }
}

export namespace Place {
  export type Input = { name: string }
  export type Output = { id: ID, name: Name, rooms: Room[] }
}
