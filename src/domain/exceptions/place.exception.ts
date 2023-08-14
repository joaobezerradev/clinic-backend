import { CustomError } from '@domain/errors'
import { Exception } from '@domain/exceptions'

export class PlaceAlreadyExistsException extends Exception {
  constructor (field?: string) { super([new CustomError('Place already exists', field)]) }
}

export class PlaceNotFoundException extends Exception {
  constructor (field?: string) { super([new CustomError('Place not found', field)]) }
}
