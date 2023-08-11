import { CustomError } from '@domain/errors'
import { type ValueObject } from '@domain/value-objects'

type Data = number

export class Percentage implements ValueObject<Data> {
  constructor (private readonly data: Data) { }

  validate (prefix = ''): CustomError[] {
    const errors: CustomError[] = []
    if (!this.data) {
      errors.push(new CustomError('Percentage is required', `${prefix}percentage`))
    }

    if (!(typeof this.data === 'number')) {
      errors.push(new CustomError('Percentage must be a number', `${prefix}percentage`))
    }

    if (this.data <= 0) {
      errors.push(new CustomError('Percentage must be greater than 0', `${prefix}percentage`))
    }

    if (this.data > 1) {
      errors.push(new CustomError('Percentage must be lower or equal than 1', `${prefix}percentage`))
    }

    return errors
  }

  get value (): Data {
    return this.data
  }
}
