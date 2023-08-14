import { CustomError } from '@domain/errors'
import { Exception } from '@domain/exceptions'

export class PlanAlreadyExistsException extends Exception {
  constructor (field?: string) { super([new CustomError('Plan already exists', field)]) }
}

export class PlanNotFoundException extends Exception {
  constructor (field?: string) { super([new CustomError('Plan not found', field)]) }
}
