import { CustomError } from '@domain/errors'
import { type ValueObject } from './value-object'

type Data = string

export class Name implements ValueObject<Data> {
  constructor (private readonly data: Data) { }

  validate (prefix: string = ''): CustomError[] {
    const errors: CustomError[] = []

    if (!this.data) {
      errors.push(new CustomError('Name is required', `${prefix}name`, this.data))
    }

    if (!(typeof this.data === 'string')) {
      errors.push(new CustomError('Name must be a string', `${prefix}name`, this.data))
    }

    if (!this.data.includes(' ')) {
      errors.push(new CustomError('Name must be compound', `${prefix}name`, this.data))
    }

    return errors
  }

  get value (): Data {
    return this.data
  }
}
