export class CreatePatientCommand {
  constructor (readonly data: CreatePatientCommand.Data) { }
}

export namespace CreatePatientCommand {
  export type Data = {
    name: string
    email: string
    phone: string
    document: string
    birthdate: string
    address: {
      street: string
      number: string
      neighborhood: string
      city: string
      state: string
      postalCode: string
      complement?: string
    }
  }
}

export class UpdatePatientCommand {
  constructor (
    readonly id: string,
    readonly name?: string,
    readonly phone?: string,
    readonly address?: Partial<{
      street: string
      number: string
      complement: string
      neighborhood: string
      city: string
      state: string
      postalCode: string
    }>
  ) {}
}

export namespace UpdatePatientCommand {
  export type Data = Partial<{
    name: string
    email: string
    phone: string
    document: string
    birthdate: string
    address: Partial<{
      street: string
      number: string
      neighborhood: string
      city: string
      state: string
      postalCode: string
      complement?: string
    }>
  }>
}

export class DeletePatientCommand {
  constructor (readonly id: string) {}
}
