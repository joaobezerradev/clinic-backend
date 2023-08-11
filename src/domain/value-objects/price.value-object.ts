import { CustomError } from '@domain/errors'
import { type ValueObject } from '@domain/value-objects'

type Data = number

export class Price implements ValueObject<Data> {
  constructor (private readonly data: Data) { }

  validate (prefix = ''): CustomError[] {
    const errors: CustomError[] = []
    if (!this.data) {
      errors.push(new CustomError('Price is required', `${prefix}price`))
    }

    if (!(typeof this.data === 'number')) {
      errors.push(new CustomError('Price must be a number', `${prefix}price`))
    }

    if (this.data <= 0) {
      errors.push(new CustomError('Price must be greater than 0', `${prefix}price`, this.data))
    }

    return errors
  }

  get value (): Data {
    return this.data
  }
}
