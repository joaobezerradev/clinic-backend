import { ConnectionPrisma } from '@infra/database/connection'
import { RepositoryFactoryPrisma } from '@infra/database/repositories/prisma/factory.prisma'

export const connection = new ConnectionPrisma()

export const repositoryFactory = new RepositoryFactoryPrisma(connection)
