import { CreatePatientHandler } from '@application/handlers'
import { repositoryFactory } from '@infra/factory/repositories/repository-factory'

export const createPatientHandlerFactory = new CreatePatientHandler(repositoryFactory.createPatientRepository())
