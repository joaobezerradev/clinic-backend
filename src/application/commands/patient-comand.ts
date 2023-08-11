export class CreatePatientCommand {
  constructor (
    readonly name: string,
    readonly email: string,
    readonly phone: string,
    readonly birthdate: string,
    readonly address: Address
  ) { }
}

type Address = {
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  postalCode: string
}
