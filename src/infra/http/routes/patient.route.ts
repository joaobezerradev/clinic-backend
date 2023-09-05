import { Router } from 'blaze-http'

import { createPatientController, listPatientsController } from '../controllers'

export const patientRouter = new Router()

patientRouter.register('GET', '/patient', listPatientsController)
patientRouter.register('POST', '/patient', createPatientController)
