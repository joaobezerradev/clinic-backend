import { CustomError } from '@domain/errors'
import { type ValueObject } from './value-object'

type Data = string

export class Phone implements ValueObject<Data> {
  constructor (private readonly data: Data) { }

  validate (prefix = ''): CustomError[] {
    const errors: CustomError[] = []

    if (!this.data) {
      errors.push(new CustomError('Phone is required', `${prefix}phone`))
    }

    if (!(typeof this.data === 'string')) {
      errors.push(new CustomError('Phone must be a string', `${prefix}phone`, this.data))
    }

    const regex = /^\d{4}-\d{2}-\d{2}$/
    if (!regex.test(this.data)) {
      errors.push(new CustomError('Invalid phone format', `${prefix}phone`, this.data))
    }
    return errors
  }

  get value (): Data {
    return this.data
  }
}
