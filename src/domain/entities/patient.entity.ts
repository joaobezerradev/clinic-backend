import { Entity } from '@domain/entities'
import { Address, Birthdate, Email, ID, Name, Phone } from '@domain/value-objects'

export class Patient extends Entity {
  readonly name: Name
  readonly email: Email
  readonly phone: Phone
  readonly birthdate: Birthdate
  readonly address: Address

  constructor (params: Partial<Patient>) {
    super(params)
    Object.assign(this, params)
  }

  static create (params: Patient.Create): Patient {
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
  export type Create = {
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
