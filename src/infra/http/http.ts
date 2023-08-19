type Handler<Req, Res> = (req: Req, res: Res) => Promise<void>

export interface HttpServer<Req, Res> {
  start: (port: number, callback?: () => void) => void
  get: (path: string, handler: Handler<Req, Res>) => void
  post: (path: string, handler: Handler<Req, Res>) => void
  put: (path: string, handler: Handler<Req, Res>) => void
  patch: (path: string, handler: Handler<Req, Res>) => void
  delete: (path: string, handler: Handler<Req, Res>) => void
}
