import { type PatientRepository } from '@domain/repositories'
import { type Connection } from '@infra/database/connection'

import { PatientRepositoryPrisma } from './patient-repository.prisma'

export class RepositoryFactoryPrisma {
  constructor (private readonly connection: Connection) {}

  createPatientRepository (): PatientRepository {
    return new PatientRepositoryPrisma(this.connection)
  }
}
