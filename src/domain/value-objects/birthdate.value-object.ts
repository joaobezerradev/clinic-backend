import { CustomError } from '@domain/errors'
import { type ValueObject } from '@domain/value-objects'

type Data = string

export class Birthdate implements ValueObject<Data> {
  constructor (private readonly data: Data) { }

  validate (prefix = ''): CustomError[] {
    const errors: CustomError[] = []

    if (!this.data) {
      errors.push(new CustomError('Birthdate is required', `${prefix}birthdate`))
    }

    const regex = /^\d{4}-\d{2}-\d{2}$/
    if (!regex.test(this.data)) {
      errors.push(new CustomError('Invalid birthdate format', `${prefix}birthdate`, this.data))
    }
    return errors
  }

  get value (): Data {
    return this.data
  }
}
