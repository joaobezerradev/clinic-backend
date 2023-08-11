import { CustomError } from '@domain/errors'
import { type ValueObject } from './value-object'

type Data = {
  street: string
  number: string
  city: string
}

export class Address implements ValueObject<Data> {
  constructor (private readonly data: Data) { }

  validate (prefix: string = ''): CustomError[] {
    const errors: CustomError[] = []

    if (!this.data.street) {
      errors.push(new CustomError('Street is required', `${prefix}street`))
    }

    if (!this.data.number) {
      errors.push(new CustomError('Number is required', `${prefix}number`))
    }

    if (!this.data.city) {
      errors.push(new CustomError('City is required', `${prefix}city`))
    }

    return errors
  }

  get value (): Data {
    return this.data
  }
}
