import { ID } from '@domain/value-objects'

export class DeadLetter {
  readonly id: ID
  readonly queueName: string
  readonly payload: Record<string, unknown>
  readonly error: Record<string, unknown>
  readonly createdAt: Date

  constructor (params: Partial<DeadLetter>) {
    Object.assign(this, params)
  }

  static create (params: {
    queueName: string
    payload: Record<string, unknown>
    error: Record<string, unknown>
  }): DeadLetter {
    return new DeadLetter({ id: new ID(), createdAt: new Date(), ...params })
  }
}
