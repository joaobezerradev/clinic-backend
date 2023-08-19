import { type PrismaClient } from '@prisma/client'

export class PlaceRepository {
  constructor (private readonly prisma: PrismaClient) {}

  async findAll (): Promise<any> {
    return this.prisma.place.findMany()
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
      data: {
        neighborhood: params.neighborhood,
        name: params.name,
        city: params.city,
        number: params.number,
        postal_code: params.postalCode,
        complement: params.complement,
        state: params.state,
        street: params.street
      }
    })
  }
}
