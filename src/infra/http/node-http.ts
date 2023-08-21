import { Exception } from '@domain/exceptions'

import { type HttpServer } from './http'
import { corsMiddleware } from './lib/middlewares/cors'
import { type Request } from './lib/request'
import { type Response } from './lib/response'
import { HttpServer as NodeHttpServer } from './lib/server'

export class NodeHttp implements HttpServer<Request, Response> {
  private readonly server: NodeHttpServer

  constructor () {
    const server = new NodeHttpServer()

    server.apply(corsMiddleware())
    server.useError(Exception)
    this.server = server
  }

  get (path: string, handler: (req: Request, res: Response) => Promise<void>, schema?: any): void {
    this.server.route('GET', path, handler, schema)
  }

  post (path: string, handler: (req: Request, res: Response) => Promise<void>, swagger?: any): void {
    this.server.route('POST', path, handler, swagger)
  }

  put (path: string, handler: (req: Request, res: Response) => Promise<void>, swagger?: any): void {
    this.server.route('PUT', path, handler, swagger)
  }

  patch (path: string, handler: (req: Request, res: Response) => Promise<void>, swagger?: any): void {
    this.server.route('PATCH', path, handler, swagger)
  }

  delete (path: string, handler: (req: Request, res: Response) => Promise<void>, swagger?: any): void {
    this.server.route('DELETE', path, handler, swagger)
  }

  start (port: number, callback?: () => void): void {
    this.server.listen(port, callback)
  }
}
