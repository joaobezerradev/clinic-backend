import { Entity } from './entity'
import { ID, Code, Percentage } from '@domain/value-objects'

export class Coupon extends Entity {
  readonly id: ID
  readonly code: Code
  readonly percentage: Percentage

  constructor (params: Partial<Coupon>) {
    super()
    Object.assign(this, params)
  }

  static create (params: Coupon.Input): Coupon {
    return new Coupon({
      id: new ID(),
      code: new Code(params.code),
      percentage: new Percentage(params.percentage)
    })
  }

  applyTo (amount: number): number {
    return amount * (1 - this.percentage.value / 10 * 10)
  }
}

export namespace Coupon {
  export type Input = {
    code: string
    percentage: number
  }
}
