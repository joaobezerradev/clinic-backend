import { type Request } from './request'
import { type Response } from './response'

export type RequestHandler = (req: Request, res: Response) => Promise<void>

export class Router {
  private routes: Record<string, { handler: RequestHandler, pattern: RegExp, paramNames: string[] }> = {}

  register (method: string, path: string, requestHandler: RequestHandler): void {
    const paramNames: string[] = []
    const patternStr = '^' + path.replace(/:([a-zA-Z0-9_]+)/g, (_, paramName) => {
      paramNames.push(paramName)
      return '([a-zA-Z0-9_]+)'
    }) + '$'
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
