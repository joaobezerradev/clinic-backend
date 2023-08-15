import { Entity, Room } from '@domain/entities'
import { CustomError } from '@domain/errors'
import { Exception } from '@domain/exceptions'
import { ID, Name } from '@domain/value-objects'

export class Place extends Entity {
  readonly name: Name
  readonly rooms: Room[]

  constructor (params: Partial<Place>) {
    super()
    Object.assign(this, params)
  }

  static create (params: Place.Create): Place {
    return new Place({ id: new ID(), name: new Name(params.name), rooms: [] })
  }

  addRoom (name: string): void {
    const foundRoom = this.rooms.find(room => room.name.value.toLowerCase() === name.toLowerCase())
    if (foundRoom) throw new Exception([new CustomError('Room already exists', 'name', name)])

    this.rooms.push(Room.create({ name }))
  }
}

export namespace Place {
  export type Create = { name: string }
}
