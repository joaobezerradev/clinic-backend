import { type Handler } from '@application/handlers'
import { type ListPatientsQuery } from '@application/queries'
import { type Connection } from '@infra/database/connection'

export class ListPatientsHandler implements Handler<ListPatientsQuery, void> {
  readonly name: string = ListPatientsHandler.name

  constructor (private readonly connection: Connection) { }

  async handle (params: ListPatientsQuery): Promise<void> {
    const offset = (params.data.page - 1) * params.data.size
    const [patientCount] = await this.connection.query('SELECT COUNT(*) FROM patient')

    const patientData = await this.connection.query('SELECT * FROM patient LIMIT $1 OFFSET $2',
      [+params.data.size, +offset]
    )

    console.log({ patientCount: parseInt(patientCount.count), data: patientData })
  }
}
