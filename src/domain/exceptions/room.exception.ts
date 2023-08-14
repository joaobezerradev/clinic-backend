import { CustomError } from '@domain/errors'
import { Exception } from '@domain/exceptions'

export class RoomAlreadyExistsException extends Exception {
  constructor (field?: string) { super([new CustomError('Room already exists', field)]) }
}

export class RoomNotFoundException extends Exception {
  constructor (field?: string) { super([new CustomError('Room not found', field)]) }
}
