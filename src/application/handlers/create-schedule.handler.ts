import { type CreateSchedulesCommand } from '@application/commands'
import { Exception, PlaceNotFoundException } from '@domain/exceptions'
import { type FactoryRepository, type PlaceRepository } from '@domain/repositories'

export class CreateScheduleHandler {
  private readonly placeRepository: PlaceRepository

  constructor (factoryRepository: FactoryRepository) {
    this.placeRepository = factoryRepository.createPlaceRepository()
  }

  async handle (command: CreateSchedulesCommand): Promise<void> {
    const place = await this.placeRepository.findByRoomId(command.roomId)
    if (!place) throw new PlaceNotFoundException('roomId')

    for (const schedule of command.schedules) {
      const [room] = place.rooms
      const error = room.addSchedule(schedule)
      if (error) throw new Exception([error])
    }

    await this.placeRepository.save(place)
  }
}
