import { randomUUID } from 'node:crypto'

import { CustomError } from '@domain/errors'
import { type ValueObject } from '@domain/value-objects'

type Data = string

export class ID implements ValueObject<Data> {
  private readonly data: Data

  constructor (data?: Data) {
    this.data = data ?? randomUUID()
  }

  validate (prefix = ''): CustomError[] {
    const errors: CustomError[] = []

    if (!this.data) {
      errors.push(new CustomError('Id is required', `${prefix}id`))
    }

    if (!(typeof this.data === 'string')) {
      errors.push(new CustomError('Id must be a string', `${prefix}id`, this.data))
    }

    const regex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[4][0-9a-fA-F]{3}\b-[89abAB][0-9a-fA-F]{3}\b-[0-9a-fA-F]{12}$/
    if (!regex.test(this.value)) {
      errors.push(new CustomError('Invalid id format', `${prefix}id`, this.value))
    }
    return errors
  }

  get value (): Data {
    return this.data
  }
}
