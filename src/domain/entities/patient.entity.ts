import { Name, ID, Birthdate, Phone, Email, Address } from '@domain/value-objects'
import { Entity } from './entity'

export class Patient extends Entity {
  readonly id: ID
  readonly name: Name
  readonly email: Email
  readonly phone: Phone
  readonly birthdate: Birthdate
  readonly address: Address

  constructor (params: Partial<Patient>) {
    super()
    Object.assign(this, params)
  }

  static create (params: Patient.Input): Patient {
    return new Patient({
      id: new ID(),
      name: new Name(params.name),
      email: new Email(params.email),
      birthdate: new Birthdate(params.birthdate),
      phone: new Phone(params.phone),
      address: new Address(params.address)
    })
  }
}

export namespace Patient {
  export type Input = {
    name: string
    email: string
    phone: string
    birthdate: string
    address: {
      street: string
      number: string
      city: string
    }
  }
}
