import { FieldError } from '@domain/errors'
import { type PlaceRepository } from '@domain/repositories'
import { type CreateSchedulesCommand } from 'application/commands'

export class CreateScheduleHandler {
  constructor (private readonly placeRepository: PlaceRepository) { }

  async handle (command: CreateSchedulesCommand): Promise<void> {
    const place = await this.placeRepository.findByRoomId(command.roomId)
    if (!place) throw new FieldError('Place not found.', 'roomId', command.roomId)

    place.setSchedules(command.schedules)

    await this.placeRepository.save(place)
  }
}