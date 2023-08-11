import { type CustomError } from '@domain/errors'

// Should validate if property exists
// Should validate type of property

export interface ValueObject<T> {
  value: T
  validate: (prefix?: string) => CustomError[]
}
