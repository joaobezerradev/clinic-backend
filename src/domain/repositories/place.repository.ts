import { type Place } from '@domain/entities'

export interface PlaceRepository {
  findByName: (name: string) => Promise<Place | null>
  findByRoomId: (roomId: string) => Promise<Place | null>
  findById: (id: string) => Promise<Place | null>
  save: (place: Place) => Promise<void>
}
