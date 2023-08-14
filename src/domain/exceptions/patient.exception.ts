import { CustomError } from '@domain/errors'
import { Exception } from '@domain/exceptions'

export class PatientAlreadyExistsException extends Exception {
  constructor (field?: string) { super([new CustomError('Patient already exists', field)]) }
}

export class PatientNotFoundException extends Exception {
  constructor (field?: string) { super([new CustomError('Patient not found', field)]) }
}
