export class GetAppointmentsForPatientQuery {
  constructor (readonly patientId: string) { }
}

export class ListPatientsQuery {
  constructor (readonly data: ListPatientsQuery.Input) { }
}

export namespace ListPatientsQuery {
  export type Input = {
    sort?: 'ASC' | 'DESC'
    page: number
    size: number
  }

  export type Paginate<R> = {
    total: number
    data: R[]
  }
  export type Output = Paginate<{
    id: string
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
  }>
}
