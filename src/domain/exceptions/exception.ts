import { type CustomError } from '@domain/errors'

export class Exception extends Error {
  constructor (readonly errors: CustomError[]) {
    super()
  }
}
