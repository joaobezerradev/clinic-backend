import { CustomError } from '@domain/errors'
import { type ValueObject } from '@domain/value-objects'

type Data = {
  state: string
  street: string
  number: string
  city: string
  neighborhood: string
  postalCode: string
  complement?: string
}

export class Address implements ValueObject<Data> {
  constructor (private readonly data: Data) { }

  validate (prefix = ''): CustomError[] {
    const errors: CustomError[] = []

    if (!this.data.state) {
      errors.push(new CustomError('State is required', `${prefix}state`))
    }

    if (!this.data.street) {
      errors.push(new CustomError('Street is required', `${prefix}street`))
    }

    if (!this.data.number) {
      errors.push(new CustomError('Number is required', `${prefix}number`))
    }

    if (!this.data.city) {
      errors.push(new CustomError('City is required', `${prefix}city`))
    }

    if (!this.data.neighborhood) {
      errors.push(new CustomError('Neighborhood is required', `${prefix}city`))
    }

    if (!this.data.postalCode) {
      errors.push(new CustomError('PostalCode is required', `${prefix}city`))
    }

    return errors
  }

  get value (): Data {
    return this.data
  }
}
