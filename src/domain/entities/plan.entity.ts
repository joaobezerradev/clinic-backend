import { Entity } from '@domain/entities'
import { ID, Name, Price } from '@domain/value-objects'

export class Plan extends Entity {
  readonly name: Name
  readonly price: Price

  constructor (params: Partial<Plan>) {
    super(params)
    Object.assign(this, params)
  }

  static create (params: Plan.Input): Plan {
    return new Plan({
      id: new ID(),
      name: new Name(params.name),
      price: new Price(params.price)
    })
  }
}

export namespace Plan {
  export type Input = { name: string, price: number }
}
