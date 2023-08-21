import * as fs from 'fs'
import cluster from 'node:cluster'
import { existsSync, readFileSync } from 'node:fs'
import { type IncomingMessage, type ServerResponse, createServer } from 'node:http'
import * as os from 'node:os'
import * as path from 'node:path'

import { Request } from './request'
import { Response } from './response'
import { type RequestHandler, Router } from './router'

export class HttpServer {
  private readonly middlewares: RequestHandler[] = []
  private readonly router: Router = new Router()
  private errorClass?: new (...args: any[]) => Error // Armazena a classe do erro
  private readonly swaggerDoc: any = {
    openapi: '3.0.0',
    info: { title: 'My API', version: '1.0.0' },
    paths: {}
  }

  constructor () {
    this.route('GET', '/api-docs', this.serveSwagger)
    this.route('GET', '/static/*', this.serveStaticFiles)
  }

  route (method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', path: string, handler: RequestHandler, swaggerInputOutput?: any): void {
    this.router.register(method, path, handler)

    if (swaggerInputOutput) {
      this.swaggerDoc.paths[path] = { [method.toLowerCase()]: swaggerInputOutput }
    }
  }

  apply (middleware: RequestHandler): void {
    this.middlewares.push(middleware)
  }

  useError (errorClass: new (...args: any[]) => Error): void {
    this.errorClass = errorClass
  }

  private async serveStaticFiles (req: Request, res: Response): Promise<void> {
    const publicDir = path.resolve(__dirname, '..', '..', '..', '..', 'public')
    const filePath = path.join(publicDir, req.url!.replace('/static', ''))
    if (existsSync(filePath) && fs.statSync(filePath).isFile()) {
      const fileContent = readFileSync(filePath)
      const ext = path.extname(filePath)
      const contentType = getContentType(ext)
      res.send(fileContent, 200, { 'Content-Type': contentType })
    } else {
      res.notFoundError()
    }
  }

  async handleRequest (req: IncomingMessage, res: ServerResponse): Promise<void> {
    const request = await Request.create(req)
    const response = new Response(res)

    await Promise.all(this.middlewares.map(async middle => middle(request, response)))

    try {
      await this.router.route(request, response)
    } catch (error) {
      if (this.errorClass && error instanceof this.errorClass) {
        response.json(error, 400)
        return
      }
      response.internalServerError()
    }
  }

  buildSwaggerDoc (params: {
    summary: string
    tags?: string[]
    deprecated?: boolean
    authentication?: boolean
    operationId?: string
    input?: object
    output?: object
  }): any {
    const responses: any = {
      200: params.output
        ? {
            description: 'Success',
            content: {
              'application/json': {
                schema: params.output
              }
            }
          }
        : { description: 'Success' },
      400: { description: 'Bad Request', content: { 'application/json': { schema: { type: 'object', properties: { errors: { type: 'array', items: { type: 'string' } } } } } } },
      401: { description: 'Unauthorized', content: { 'application/json': { schema: { type: 'object', properties: { errors: { type: 'array', items: { type: 'string' } } } } } } },
      403: { description: 'Forbidden', content: { 'application/json': { schema: { type: 'object', properties: { errors: { type: 'array', items: { type: 'string' } } } } } } },
      500: { description: 'Internal Server Error', content: { 'application/json': { schema: { type: 'object', properties: { errors: { type: 'array', items: { type: 'string' } } } } } } }
    }

    return {
      summary: params.summary,
      tags: params.tags,
      deprecated: params.deprecated,
      operationId: params.operationId,
      requestBody: params.input
        ? {
            content: {
              'application/json': {
                schema: params.input
              }
            }
          }
        : undefined,
      responses,
      security: params.authentication ? [{ BearerAuth: [] }] : undefined
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

  private async serveSwagger (req: Request, res: Response): Promise<void> {
    const swaggerUiAssetPath = path.resolve(__dirname, '..', '..', '..', '..', 'public', 'swagger-ui')
    console.log(swaggerUiAssetPath)
    if (req.url === '/api-docs') {
      const uiHtml = fs.readFileSync(path.join(swaggerUiAssetPath, 'index.html'), 'utf8')
      const htmlWithUrls = uiHtml
        .replace('./swagger-ui.css', '/static/swagger-ui/swagger-ui.css')
        .replace('./index.css', '/static/swagger-ui/index.css')
        .replace('./favicon-32x32.png', '/static/swagger-ui/favicon-32x32.png')
        .replace('./favicon-16x16.png', '/static/swagger-ui/favicon-16x16.png')
        .replace('./swagger-ui-bundle.js', '/static/swagger-ui/swagger-ui-bundle.js')
        .replace('./swagger-ui-standalone-preset.js', '/static/swagger-ui/swagger-ui-standalone-preset.js')
        .replace('./swagger-initializer.js', '/static/swagger-ui/swagger-initializer.js')
        .replace('https://petstore.swagger.io/v2/swagger.json', '/swagger.json')
        .replace('url: "https://petstore.swagger.io/v2/swagger.json"', 'url: "/swagger.json"')

      res.send(htmlWithUrls, 200, { 'Content-Type': 'text/html' })
    } else if (req.url!.startsWith('/swagger-ui') || req.url!.startsWith('/favicon')) {
      const assetPath = path.join(swaggerUiAssetPath, req.url!.replace('/swagger-ui', ''))
      if (fs.existsSync(assetPath)) {
        const asset = fs.readFileSync(assetPath)
        const ext = path.extname(req.url!)
        let contentType = 'application/javascript'
        if (ext === '.css') contentType = 'text/css'
        if (ext === '.html') contentType = 'text/html'
        if (ext === '.png') contentType = 'image/png'
        res.send(asset, 200, { 'Content-Type': contentType })
      } else {
        res.notFoundError()
      }
    } else if (req.url === '/swagger.json') {
      res.send(this.swaggerDoc, 200, { 'Content-Type': 'application/json' })
    }
  }
}

function getContentType (extension: string): string {
  switch (extension) {
    case '.css':
      return 'text/css'
    case '.html':
      return 'text/html'
    case '.png':
      return 'image/png'
    case '.json':
      return 'application/json'
    case '.js':
      return 'application/javascript'
    default:
      return 'application/octet-stream'
  }
}
