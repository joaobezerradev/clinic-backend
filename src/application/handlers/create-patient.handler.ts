import { type CreatePatientCommand } from '@application/commands'
import { type Handler } from '@application/handlers'
import { Patient } from '@domain/entities'
import { PatientAlreadyExistsException } from '@domain/exceptions'
import { type PatientRepository } from '@domain/repositories'

export class CreatePatientHandler implements Handler<CreatePatientCommand, void> {
  constructor (private readonly patientRepository: PatientRepository) { }

  async handle (command: CreatePatientCommand): Promise<void> {
    const foundEmail = await this.patientRepository.findByEmail(command.email)
    if (foundEmail) throw new PatientAlreadyExistsException('email')

    const patient = Patient.create(command)
    await this.patientRepository.save(patient)
  }
}
