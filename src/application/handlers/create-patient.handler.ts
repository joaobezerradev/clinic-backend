import { type CreatePatientCommand } from '@application/commands'
import { type Handler } from '@application/handlers'
import { Patient } from '@domain/entities'
import { PatientAlreadyExistsException } from '@domain/exceptions'
import { type FactoryRepository, type PatientRepository } from '@domain/repositories'

export class CreatePatientHandler implements Handler<CreatePatientCommand, void> {
  private readonly patientRepository: PatientRepository

  constructor (factoryRepository: FactoryRepository) {
    this.patientRepository = factoryRepository.createPatientRepository()
  }

  async handle (command: CreatePatientCommand): Promise<void> {
    const foundEmail = await this.patientRepository.findByEmail(command.email)
    if (foundEmail) throw new PatientAlreadyExistsException('email')

    const patient = Patient.create(command)
    await this.patientRepository.save(patient)
  }
}
