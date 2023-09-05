import { type CustomError } from '@domain/errors'

export const enum Type {
  VALIDATION = 'VALIDATION',
  NOT_FOUND = 'NOT_FOUND',
  UNPROCESSABLE = 'UNPROCESSABLE'
}

export abstract class Exception extends Error {
  constructor (
    readonly name: string,
    public type: Type,
    readonly errors: CustomError[]
  ) {
    super()
  }
}
