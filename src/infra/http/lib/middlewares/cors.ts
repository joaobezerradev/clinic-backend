import { type Request } from '../request'
import { type Response } from '../response'
import { type RequestHandler } from '../router'

export const corsMiddleware = (): RequestHandler => {
  return async (_req: Request, res: Response) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  }
}
