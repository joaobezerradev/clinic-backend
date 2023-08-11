import { type Module } from '@infra/shared/interfaces'

export class LoggerModule implements Module {
  async start (): Promise<void> {
    console.log('PAYMENT-GATEWAY MODULE: init successful')
  }
}
