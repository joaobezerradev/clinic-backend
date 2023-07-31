import { type PrismaClient } from '@prisma/client'

export class PlaceRepository {
  constructor (private readonly prisma: PrismaClient) {
  }

  async findAll (): Promise<any> {
    return await this.prisma.place.findMany()
  }

  async save (params: {
    neighborhood: string
    name: string
    city: string
    number: string
    postalCode: string
    complement: string
    state: string
    street: string
  }): Promise<void> {
    await this.prisma.place.create({
      data: params
    })
  }
}
