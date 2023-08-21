import { type Request } from './request'
import { type Response } from './response'

export type RequestHandler = (req: Request, res: Response) => Promise<void>

export class Router {
  private routes: Record<string, { handler: RequestHandler, pattern: RegExp, paramNames: string[] }> = {}

  register (method: string, path: string, requestHandler: RequestHandler): void {
    const paramNames: string[] = []
    let patternStr = '^' + path.replace(/:([a-zA-Z0-9_]+)/g, (_, paramName) => {
      paramNames.push(paramName)
      return '([a-zA-Z0-9_]+)'
    })

    if (path.endsWith('/*')) {
      patternStr = patternStr.slice(0, -2) + '(?:/.*)?' // Adiciona uma expressão regular para corresponder a qualquer coisa após a barra, incluindo a própria barra
    }

    patternStr += '$'
    const pattern = new RegExp(patternStr)

    this.routes[`${method.toUpperCase()}|${patternStr}`] = { handler: requestHandler, pattern, paramNames }
  }

  async route (req: Request, res: Response): Promise<void> {
    const urlPath = req.url?.split('?')[0] ?? '/'

    for (const key in this.routes) {
      const { pattern, paramNames, handler } = this.routes[key]
      const match = pattern.exec(urlPath)
      if (match) {
        req.params = paramNames.reduce<Record<string, string>>((params, paramName, index) => {
          params[paramName] = match[index + 1]
          return params
        }, {})

        await handler(req, res)
        return
      }
    }

    res.notFoundError()
  }
}
