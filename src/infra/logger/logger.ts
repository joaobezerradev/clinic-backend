export interface Logger {
  info: Params
  error: Params
  debug: Params
}

type Params = (message: string) => void
