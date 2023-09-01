import { Router } from 'blaze-http'

import { createPatientController } from '../controllers'

export const patientRouter = new Router()

patientRouter.register('POST', '/patient', createPatientController)
