import { type CreateRoomCommand } from '@application/commands'
import { type Handler } from '@application/interfaces'
import { PlaceNotFoundException } from '@domain/exceptions'
import { type PlaceRepository } from '@domain/repositories'

export class CreateRoomHandler implements Handler<CreateRoomCommand, void> {
  constructor (private readonly placeRepository: PlaceRepository) { }

  async handle (command: CreateRoomCommand): Promise<void> {
    const place = await this.placeRepository.findById(command.placeId)
    if (!place) throw new PlaceNotFoundException('placeId')

    //   place.addRoom(command.name)

    await this.placeRepository.save(place)
  }
}
