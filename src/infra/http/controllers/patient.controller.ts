import { CreatePatientCommand } from '@application/commands'
import { createPatientHandlerFactory } from '@infra/factory/handlers/patient'
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
