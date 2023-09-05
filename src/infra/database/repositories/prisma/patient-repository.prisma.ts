import { Patient } from '@domain/entities'
import { type PatientRepository } from '@domain/repositories'
import { Address, Birthdate, Email, ID, Name, Phone } from '@domain/value-objects'
import { type Connection } from '@infra/database/connection'
import { type PrismaClient } from '@prisma/client'

export class PatientRepositoryPrisma implements PatientRepository {
  constructor (private readonly connection: Connection<PrismaClient>) { }

  async query (sql: string, params?: any[]): Promise<any[]> {
    if (params?.length) return this.connection.getConnection().$queryRawUnsafe(sql, ...params)

    return this.connection.getConnection().$queryRawUnsafe(sql)
  }

  private parse (patient: any): Patient {
    return new Patient({
      id: new ID(patient.accountId),
      birthdate: new Birthdate(patient.birthdate),
      email: new Email(patient.account.email),
      createdAt: patient.createdAt,
      updatedAt: patient.updatedAt,
      deletedAt: patient.deletedAt,
      name: new Name(patient.name),
      phone: new Phone(patient.phone),
      address: new Address({
        city: patient.city,
        number: patient.number,
        street: patient.street,
        neighborhood: patient.neighborhood,
        postalCode: patient.postalCode,
        state: patient.state,
        complement: patient.complement
      })
    })
  }

  async findByDocument (document: string): Promise<Patient | null> {
    const patient = await this.connection.getConnection().patient.findUnique({ where: { document }, include: { account: true } })

    if (!patient) return null

    return this.parse(patient)
  }

  async findByEmail (email: string): Promise<Patient | null> {
    await this.connection.getConnection().$connect()
    const patient = await this.connection.getConnection().patient.findFirst({ where: { account: { email } }, include: { account: true } })
    if (!patient) return null
    return this.parse(patient)
  }

  async save (patient: Patient): Promise<void> {
    await this.connection.getConnection().patient.upsert({
      create: {
        id: new ID().value,
        birthdate: patient.birthdate.value,
        city: patient.address.value.city,
        neighborhood: patient.address.value.neighborhood,
        createdAt: patient.createdAt,
        updatedAt: patient.updatedAt,
        document: patient.document.value,
        name: patient.name.value,
        number: patient.address.value.number,
        phone: patient.phone.value,
        postalCode: patient.address.value.postalCode,
        state: patient.address.value.state,
        street: patient.address.value.street,
        complement: patient.address.value.complement,
        account: {
          create: {
            id: patient.id.value,
            email: patient.email.value,
            password: 'PASSWD',
            role: 'PATIENT',
            createdAt: patient.createdAt
          }
        }
      },
      where: {
        accountId: patient.id.value
      },
      update: {
        birthdate: patient.birthdate.value,
        city: patient.address.value.city,
        neighborhood: patient.address.value.neighborhood,
        createdAt: patient.createdAt,
        updatedAt: patient.updatedAt,
        document: patient.document.value,
        name: patient.name.value,
        number: patient.address.value.number,
        phone: patient.phone.value,
        postalCode: patient.address.value.postalCode,
        state: patient.address.value.state,
        street: patient.address.value.street,
        complement: patient.address.value.complement,
        account: {
          update: {
            email: patient.email.value,
            password: 'pass'
          }
        }
      }
    })
  }
}
