import { CustomError } from '@domain/errors'
import { Exception } from './exception'

export class PlaceAlreadyExistsException extends Exception {
  constructor () { super([new CustomError('Place already exists')]) }
}
