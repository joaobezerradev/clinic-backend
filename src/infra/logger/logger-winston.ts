import winston from 'winston'

import { type Logger } from './logger'

export class LoggerWinston implements Logger {
  private readonly logger: winston.Logger

  constructor () {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.json()
      )
    })

    if (process.env.NODE_ENV !== 'production') {
      this.logger.add(new winston.transports.Console({
        format: winston.format.simple()
      }))
    }
  }

  info (message: string): void {
    this.logger.info(message)
  }

  error (message: string): void {
    this.logger.error(message)
  }

  debug (message: string): void {
    this.logger.debug(message)
  }
}
