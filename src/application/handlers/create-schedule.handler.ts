import { type CreateSchedulesCommand } from '@application/commands'
import { PlaceNotFoundException } from '@domain/exceptions'
import { type FactoryRepository, type PlaceRepository } from '@domain/repositories'

export class CreateScheduleHandler {
  private readonly placeRepository: PlaceRepository

  constructor (factoryRepository: FactoryRepository) {
    this.placeRepository = factoryRepository.createPlaceRepository()
  }

  async handle (command: CreateSchedulesCommand): Promise<void> {
    const place = await this.placeRepository.findByRoomId(command.roomId)
    if (!place) throw new PlaceNotFoundException('roomId')

    const [room] = place.rooms

    for (const schedule of command.schedules) {
      room.addSchedule(schedule)
    }

    await this.placeRepository.save(place)
  }
}
