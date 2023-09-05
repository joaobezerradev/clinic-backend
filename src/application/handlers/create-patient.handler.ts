import { type CreatePatientCommand } from '@application/commands'
import { type Handler } from '@application/handlers'
import { Patient } from '@domain/entities'
import { CustomError } from '@domain/errors'
import { PatientAlreadyExistsException } from '@domain/exceptions'
import { type PatientRepository } from '@domain/repositories'

export class CreatePatientHandler implements Handler<CreatePatientCommand, void> {
  readonly name: string = CreatePatientHandler.name

  constructor (private readonly patientRepository: PatientRepository) {}

  async handle (command: CreatePatientCommand): Promise<void> {
    const errors = await this.validate(command)
    if (errors.length) throw new PatientAlreadyExistsException(errors)
    const patient = Patient.create(command.data)
    await this.patientRepository.save(patient)
  }

  private async validate (command: CreatePatientCommand): Promise<CustomError[]> {
    const errors: CustomError[] = []

    const foundEmailPromise = this.patientRepository.findByEmail(command.data.email)
    const foundDocumentPromise = this.patientRepository.findByDocument(command.data.document)

    const [findEmail, findDocument] = await Promise.all([foundEmailPromise, foundDocumentPromise])

    if (findEmail) errors.push(new CustomError('Email already in use', 'email'))
    if (findDocument) errors.push(new CustomError('Document already in use', 'document'))

    return errors
  }
}
