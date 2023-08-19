import { type HttpServer } from './http'
import { corsMiddleware } from './lib/middlewares/cors'
import { type Request } from './lib/request'
import { type Response } from './lib/response'
import { HttpServer as NodeHttpServer } from './lib/server'

export class NodeHttp implements HttpServer<Request, Response> {
  private readonly server: NodeHttpServer

  constructor () {
    const server = new NodeHttpServer()

    server.use(corsMiddleware())
    this.server = server
  }

  get (path: string, handler: (req: Request, res: Response) => Promise<void>): void {
    this.server.route('GET', path, handler)
  }

  post (path: string, handler: (req: Request, res: Response) => Promise<void>): void {
    this.server.route('GET', path, handler)
  }

  put (path: string, handler: (req: Request, res: Response) => Promise<void>): void {
    this.server.route('GET', path, handler)
  }

  patch (path: string, handler: (req: Request, res: Response) => Promise<void>): void {
    this.server.route('GET', path, handler)
  }

  delete (path: string, handler: (req: Request, res: Response) => Promise<void>): void {
    this.server.route('GET', path, handler)
  }

  start (port: number, callback?: (() => void) | undefined): void {
    this.server.listen(port, callback)
  }
}
