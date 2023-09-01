import { type PatientRepository } from '@domain/repositories'
import { type PrismaClient } from '@prisma/client'

import { PatientRepositoryPrisma } from './patient-repository.prisma'

export class RepositoryFactoryPrisma {
  constructor (private readonly prisma: PrismaClient) {}

  createPatientRepository (): PatientRepository {
    return new PatientRepositoryPrisma(this.prisma)
  }
}
