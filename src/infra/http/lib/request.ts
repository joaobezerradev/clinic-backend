/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { IncomingMessage } from 'node:http'

export class Request extends IncomingMessage {
  public params: Record<string, string> = {}
  public query: Record<string, string> = {}
  public headers: any = {}
  public body: Record<string, string> = {}
  public user: Record<string, string> = {}

  static async create (req: IncomingMessage): Promise<Request> {
    const request = new Request(req)
    await request.parseBody(req)
    request.handleQueryParams(req)
    request.setHeader(req)
    return request
  }

  private async parseBody (req: IncomingMessage): Promise<void> {
    if (!['POST', 'PUT', 'PATCH'].includes(req.method!)) {
      return
    }

    let body = ''
    for await (const chunk of req) {
      body += chunk.toString()
    }

    try {
      this.body = JSON.parse(body)
    } catch (err) {
      console.error('Error parsing JSON body:', err)
    }
  }

  handleQueryParams (req: IncomingMessage): void {
    const url = new URL(req.url!, `http://${req.headers.host}`)
    for (const [key, value] of url.searchParams.entries()) {
      this.query[key] = value
    }
  }

  setHeader (req: IncomingMessage): void {
    this.headers = req.headers
  }

  private constructor (incomingMessage: IncomingMessage) {
    super(incomingMessage.socket)
    Object.assign(this, incomingMessage)
  }
}
