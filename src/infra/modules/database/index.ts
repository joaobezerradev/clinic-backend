import { type Module } from '@infra/shared/interfaces'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export class DatabaseModule implements Module {
  async start (): Promise<void> {
    try {
      console.log('DATABASE MODULE: init successful')
    } catch (error) {
      console.error('DATABASE MODULE: init fail', error)
    }
  }
}
