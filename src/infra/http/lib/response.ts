import { type ServerResponse } from 'node:http'

export class Response {
  constructor (private readonly serverResponse: ServerResponse) {}

  setHeader (name: string, value: string): void {
    this.serverResponse.setHeader(name, value)
  }

  json (data: object, statusCode = 200): void {
    this.serverResponse.writeHead(statusCode, { 'Content-Type': 'application/json' })
    this.serverResponse.end(JSON.stringify(data))
  }

  unauthorizedError (): void {
    this.json({ error: 'Unauthorized Error' }, 401)
  }

  internalServerError (): void {
    this.json({ error: 'Internal Server Error' }, 500)
  }

  notFoundError (): void {
    this.json({ error: 'Not found Error' }, 404)
  }
}
