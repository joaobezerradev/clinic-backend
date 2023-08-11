import { ID, Name, Price } from '@domain/value-objects'

export class Plan {
  readonly id: ID
  readonly name: Name
  readonly price: Price

  constructor (params: Partial<Plan>) {
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
