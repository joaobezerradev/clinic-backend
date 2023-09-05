import { Exception, Type } from '@domain/exceptions'
import { environment } from '@infra/config/environment'
import { Blaze, type Request, type Response } from 'blaze-http'
import { corsMiddleware } from 'blaze-http/dist/middlewares'

import { type HttpServer } from './http'
import { patientRouter } from './routes'

export class HttpServerAdapter implements HttpServer<Request, Response> {
  private readonly server: Blaze

  constructor () {
    const server = new Blaze({ port: environment.http.port })

    server.useMiddleware(corsMiddleware())
    server.useError((error, _req, res) => {
      if (error instanceof Exception) {
        const statusCode = {
          [Type.VALIDATION]: 412,
          [Type.NOT_FOUND]: 404,
          [Type.UNPROCESSABLE]: 422
        } ?? 400

        res.json(error, statusCode[error.type])
      }
    })
    server.enableSwagger({
      contact: { email: 'joaobezerra.dev@gmail.com' },
      description: 'A clinic api',
      license: { name: '', url: '' },
      termsOfService: '',
      title: 'Clinic Backend',
      version: '0.0.1'
    })
    this.server = server

    this.server.useRouter(patientRouter)
  }

  get (path: string, handler: (req: Request, res: Response) => Promise<void>, schema?: any): void {
    this.server.get(path, handler, schema)
  }

  post (path: string, handler: (req: Request, res: Response) => Promise<void>, swagger?: any): void {
    this.server.post(path, handler, swagger)
  }

  put (path: string, handler: (req: Request, res: Response) => Promise<void>, swagger?: any): void {
    this.server.put(path, handler, swagger)
  }

  patch (path: string, handler: (req: Request, res: Response) => Promise<void>, swagger?: any): void {
    this.server.patch(path, handler, swagger)
  }

  delete (path: string, handler: (req: Request, res: Response) => Promise<void>, swagger?: any): void {
    this.server.delete(path, handler, swagger)
  }

  start (callback?: () => void): void {
    this.server.listen(callback)
  }
}
