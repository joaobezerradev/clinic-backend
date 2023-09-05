import { CreatePatientHandler, ListPatientsHandler } from '@application/handlers'
import { connection, repositoryFactory } from '@infra/factory/repositories/repository-factory'

import { handlerLogger } from './decorator'

export const createPatientHandlerFactory = handlerLogger(new CreatePatientHandler(repositoryFactory.createPatientRepository()))
export const listPatientsHandlerFactory = handlerLogger(new ListPatientsHandler(connection))
