import cluster from 'node:cluster'
import { type IncomingMessage, type ServerResponse, createServer } from 'node:http'
import * as os from 'node:os'

import { Exception } from '@domain/exceptions'

import { Request } from './request'
import { Response } from './response'
import { type RequestHandler, Router } from './router'

type ErrorHandler = (error: any, req: Request, response: Response) => Promise<void>

export class HttpServer {
  private readonly middlewares: RequestHandler[] = []
  private readonly router: Router = new Router()
  private readonly errorHandler: ErrorHandler

  route (method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', path: string, handler: RequestHandler): void {
    this.router.register(method, path, handler)
  }

  use (middleware: RequestHandler): void {
    this.middlewares.push(middleware)
  }

  async handleRequest (req: IncomingMessage, res: ServerResponse): Promise<void> {
    const request = await Request.create(req)
    const response = new Response(res)

    await Promise.all(this.middlewares.map(async middle => middle(request, response)))

    try {
      await this.router.route(request, response)
    } catch (error) {
      if (error instanceof Exception) {
        response.json({ errors: error.errors }, 400)
        return
      }
      response.internalServerError()
    }
  }

  listen (port: number, callback?: () => void): void {
    const numCPUs = os.cpus().length

    if (cluster.isPrimary) {
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
      }

      cluster.on('exit', () => {
        cluster.fork()
      })

      callback?.()
    } else {
      createServer(this.handleRequest.bind(this)).listen(port)
    }
  }
}
