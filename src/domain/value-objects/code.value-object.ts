import { CustomError } from '@domain/errors'
import { type ValueObject } from '@domain/value-objects'

type Data = string

export class Code implements ValueObject<Data> {
  constructor (private readonly data: Data) { }

  validate (prefix = ''): CustomError[] {
    const errors: CustomError[] = []

    if (!this.data) {
      errors.push(new CustomError('Code is required', `${prefix}code`))
    }

    if (!(typeof this.data === 'string')) {
      errors.push(new CustomError('Code must be a string', `${prefix}code`, this.data))
    }

    return errors
  }

  get value (): Data {
    return this.data
  }
}
