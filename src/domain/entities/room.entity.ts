import { Entity, Schedule } from '@domain/entities'
import { CustomError } from '@domain/errors'
import { ID, Name } from '@domain/value-objects'

export class Room extends Entity {
  readonly name: Name
  readonly schedules: Schedule[]

  constructor (params: Partial<Room>) {
    super(params)
    Object.assign(this, params)
  }

  static create (params: Room.Input): Room {
    return new Room({
      id: new ID(),
      name: new Name(params.name)
    })
  }

  addSchedule (schedule: {
    startAt: Date
    endsAt: Date
    professionalId: string
  }): CustomError | null {
    if (this.hasConflict(schedule)) {
      return new CustomError('Schedule with time conflict')
    }
    this.schedules.push(Schedule.create({
      startAt: schedule.startAt,
      endsAt: schedule.endsAt,
      professionalId: schedule.professionalId
    }))
    return null
  }

  private hasConflict (newSchedule: {
    startAt: Date
    endsAt: Date
    professionalId: string
  }): boolean {
    for (const existingSchedule of this.schedules) {
      if ((newSchedule.startAt >= existingSchedule.startAt && newSchedule.startAt < existingSchedule.endsAt) ||
          (newSchedule.endsAt > existingSchedule.startAt && newSchedule.endsAt <= existingSchedule.endsAt) ||
          (newSchedule.startAt <= existingSchedule.startAt && newSchedule.endsAt >= existingSchedule.endsAt)) {
        return true
      }
    }
    return false
  }
}

export namespace Room {
  export type Input = { name: string }
}
