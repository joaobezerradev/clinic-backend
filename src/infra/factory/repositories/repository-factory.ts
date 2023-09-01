import { RepositoryFactoryPrisma } from '@infra/database/repositories/prisma/factory.prisma'
import { PrismaClient } from '@prisma/client'

export const repositoryFactory = new RepositoryFactoryPrisma(new PrismaClient())
