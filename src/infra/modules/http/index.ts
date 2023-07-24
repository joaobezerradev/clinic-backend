import express from 'express'
import { type Module } from '@infra/shared/interfaces'
import cors from 'cors'
import { environment } from '@infra/config/environment'
import { router } from './routes'

export class HttpModule implements Module {
  async start (): Promise<void> {
    try {
      const app = express()
      app.use(cors())
      app.use(express.json())
      app.use(router)
      app.listen(environment.HTTP_PORT)
      console.log('HTTP MODULE: init successful')
    } catch (error) {
      console.error('HTTP MODULE: init fail', error)
    }
  }
}
