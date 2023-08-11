import { CustomError } from '@domain/errors'
import { Exception } from '@domain/exceptions'

export class PlaceAlreadyExistsException extends Exception {
  constructor () { super([new CustomError('Place already exists')]) }
}
