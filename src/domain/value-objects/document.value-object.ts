import { isValidCPF } from '@brazilian-utils/brazilian-utils'
import { CustomError } from '@domain/errors'
import { type ValueObject } from '@domain/value-objects'

type Data = string

export class Document implements ValueObject<Data> {
  constructor (private readonly data: Data) { }

  validate (prefix = ''): CustomError[] {
    const errors: CustomError[] = []

    if (!this.data) {
      errors.push(new CustomError('Document is required', `${prefix}document`))
    }

    if (!(typeof this.data === 'string')) {
      errors.push(new CustomError('Document must be a string', `${prefix}document`, this.data))
    }

    if (!isValidCPF(this.data)) {
      errors.push(new CustomError('Document must be a valid document', `${prefix}document`, this.data))
    }

    return errors
  }

  get value (): Data {
    return this.data
  }
}
