import { Entity } from '@domain/entities'
import { ID } from '@domain/value-objects'

export class Schedule extends Entity {
  readonly startAt: Date
  readonly endsAt: Date
  readonly professionalId: ID

  constructor (params: Partial<Schedule>) {
    super(params)
    Object.assign(this, params)
  }

  static create (params: Schedule.Input): Schedule {
    return new Schedule({
      id: new ID(),
      startAt: params.startAt,
      endsAt: params.endsAt,
      professionalId: new ID(params.professionalId)
    })
  }
}

export namespace Schedule {
  export type Input = { startAt: Date, endsAt: Date, professionalId: string }
}
