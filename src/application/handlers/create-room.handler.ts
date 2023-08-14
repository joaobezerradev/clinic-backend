import { type CreateRoomCommand } from '@application/commands'
import { type Handler } from '@application/handlers'
import { Exception, PlaceNotFoundException } from '@domain/exceptions'
import { type PlaceRepository } from '@domain/repositories'

export class CreateRoomHandler implements Handler<CreateRoomCommand, void> {
  constructor (private readonly placeRepository: PlaceRepository) { }

  async handle (command: CreateRoomCommand): Promise<void> {
    const place = await this.placeRepository.findById(command.placeId)
    if (!place) throw new PlaceNotFoundException('placeId')

    const error = place.addRoom(command.name)
    if (error) throw new Exception([error])

    await this.placeRepository.save(place)
  }
}
