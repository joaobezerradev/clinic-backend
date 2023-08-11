import { FieldError } from '@domain/errors'
import { type PlaceRepository } from '@domain/repositories'
import { type CreateRoomCommand } from 'application/commands'
import { type Handler } from 'application/interfaces'

export class CreateRoomHandler implements Handler<CreateRoomCommand, void> {
  constructor (private readonly placeRepository: PlaceRepository) { }

  async handle (command: CreateRoomCommand): Promise<void> {
    const place = await this.placeRepository.findById(command.placeId)
    if (!place) throw new FieldError('Place not found.', 'placeId', command.placeId)

    place.addRoom(command.name)

    await this.placeRepository.save(place)
  }
}
