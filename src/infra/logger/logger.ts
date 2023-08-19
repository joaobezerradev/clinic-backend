export interface Logger {
  info: Params
  error: Params
  debug: Params
  warn: Params
}

type Params = (message: string) => void
