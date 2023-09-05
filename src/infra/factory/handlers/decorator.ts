import { type Handler } from '@application/handlers'
import axios from 'axios'

enum LogLevel {
  ERROR = 'error',
  INFO = 'info',
  WARN = 'warn',
  DEBUG = 'debug'
}

const sendLogsToLoki = async (logs: Array<{ level: LogLevel, message: string }>): Promise<void> => {
  const baseTime = Date.now() * 1e6

  const payload = { streams: [{ stream: { app: 'api' }, values: logs.map((log) => [`${baseTime}`, `${log.level.toUpperCase()}: ${log.message}`]) }] }

  try {
    await axios.post('http://loki:3100/loki/api/v1/push', payload)
  } catch (error) {
    console.error(`Failed to send logs to Loki: ${error}`)
  }
}

const logMessage = (logs: Array<{ level: LogLevel, message: string }>, level: LogLevel, message: string): void => {
  logs.push({ level, message })
  console.log(message)
}

export const handlerLogger = <Input, Output>(handler: Handler<Input, Output>): Handler<Input, Output> => {
  return {
    name: handler.name,
    handle: async (params: Input): Promise<Output> => {
      const logs: Array<{ level: LogLevel, message: string }> = []

      logMessage(logs, LogLevel.INFO, '-------Starting Handler Execution-------')
      logMessage(logs, LogLevel.INFO, `Handler Name: [${handler.name}]`)
      logMessage(logs, LogLevel.DEBUG, 'Input Parameters:')
      logMessage(logs, LogLevel.DEBUG, `${JSON.stringify(params, null, 4)}`)

      try {
        const result: Output = await handler.handle(params)

        if (result) {
          logMessage(logs, LogLevel.INFO, 'Successful Output:')
          logMessage(logs, LogLevel.DEBUG, `${JSON.stringify(result, null, 4)}`)
        } else {
          logMessage(logs, LogLevel.INFO, 'Successful Output but VOID')
        }

        return result
      } catch (error) {
        logMessage(logs, LogLevel.ERROR, 'Error Occurred:')

        if (JSON.stringify(error) !== '{}') {
          logMessage(logs, LogLevel.ERROR, `${JSON.stringify(error, null, 4)}`)
        } else {
          logMessage(logs, LogLevel.ERROR, JSON.stringify({
            error: error.message,
            stack: error.stack
          }, undefined, 4))
        }

        throw error
      } finally {
        logMessage(logs, LogLevel.INFO, '-------Handler Execution Complete-------')
        await sendLogsToLoki(logs.reverse())
      }
    }
  }
}
