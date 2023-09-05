import { CreatePatientCommand } from '@application/commands'
import { ListPatientsQuery } from '@application/queries'
import { createPatientHandlerFactory, listPatientsHandlerFactory } from '@infra/factory/handlers'
import { type Request, type Response } from 'blaze-http'

export const createPatientController = async (req: Request, res: Response): Promise<void> => {
  const command = new CreatePatientCommand({
    email: req.body.email,
    address: req.body.address,
    birthdate: req.body.birthdate,
    document: req.body.document,
    name: req.body.name,
    phone: req.body.phone
  })

  await createPatientHandlerFactory.handle(command)

  res.noContent()
}

export const listPatientsController = async (req: Request, res: Response): Promise<void> => {
  const query = new ListPatientsQuery({
    page: req.query.page,
    size: req.query.size
  })

  await listPatientsHandlerFactory.handle(query)

  res.noContent()
}
