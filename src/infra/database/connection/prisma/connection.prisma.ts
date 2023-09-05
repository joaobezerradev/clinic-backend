import { PrismaClient } from '@prisma/client'

import { type Connection } from '../connection'

export class ConnectionPrisma implements Connection {
  private readonly prisma: PrismaClient

  constructor () {
    this.prisma = new PrismaClient()
  }

  async query<T = any>(sql: string, params?: any[]): Promise<T[]> {
    if (params?.length) return this.prisma.$queryRawUnsafe(sql, ...params)
    return this.prisma.$queryRawUnsafe(sql)
  }

  getConnection (): PrismaClient {
    return this.prisma
  }
}
