import { type CustomError } from '@domain/errors'
import { Exception, Type } from '@domain/exceptions'

export class PatientAlreadyExistsException extends Exception {
  constructor (errors: CustomError[]) {
    super(PatientAlreadyExistsException.name, Type.VALIDATION, errors)
  }
}
