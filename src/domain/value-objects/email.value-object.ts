import { CustomError } from '@domain/errors'
import { type ValueObject } from '@domain/value-objects'

type Data = string

export class Email implements ValueObject<Data> {
  constructor (private readonly data: Data) { }

  validate (prefix = ''): CustomError[] {
    const errors: CustomError[] = []

    if (!this.data) {
      errors.push(new CustomError('Email is required', `${prefix}email`))
    }

    if (!(typeof this.data === 'string')) {
      errors.push(new CustomError('Email must be a string', `${prefix}email`, this.data))
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!regex.test(this.data)) {
      errors.push(new CustomError('Invalid email format', 'email', this.data))
    }

    return errors
  }

  get value (): Data {
    return this.data
  }
}
