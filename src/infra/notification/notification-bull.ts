import { type NotificationService } from '@domain/services'
import { environment } from '@infra/config/environment'
import { type Job, type JobsOptions, Queue, Worker } from 'bullmq'

type PriorityLabel = 'low' | 'normal' | 'high'

export class NotificationBullService implements NotificationService {
  private readonly emailQueue: Queue
  private readonly smsQueue: Queue
  private readonly whatsappQueue: Queue
  private readonly telegramQueue: Queue

  constructor () {
    this.emailQueue = new Queue('emails')
    this.smsQueue = new Queue('sms')
    this.whatsappQueue = new Queue('whatsapp')
    this.telegramQueue = new Queue('telegram')

    this.setupWorkers()
  }

  private setupWorkers (): void {
    const emailWorker = new Worker('emails', this.processEmail)
    emailWorker.on('failed', (job, err) => {
      console.error(`Email job ${job?.id} failed: ${err.message}`)
    })

    const smsWorker = new Worker('sms', this.processSMS)
    smsWorker.on('failed', (job, err) => {
      console.error(`SMS job ${job?.id} failed: ${err.message}`)
    })

    const whatsappWorker = new Worker('whatsapp', this.processWhatsApp)
    whatsappWorker.on('failed', (job, err) => {
      console.error(`WhatsApp job ${job?.id} failed: ${err.message}`)
    })

    const telegramWorker = new Worker('telegram', this.processTelegram)
    telegramWorker.on('failed', (job, err) => {
      console.error(`Telegram job ${job?.id} failed: ${err.message}`)
    })
  }

  private async processEmail (_job: Job): Promise<void> {
    // Replace with actual logic to send the email
    // await sendEmail(job.data);
  }

  private async processSMS (_job: Job): Promise<void> {
    // Replace with actual logic to send the SMS
    // await sendSMS(job.data);
  }

  private async processWhatsApp (_job: Job): Promise<void> {
    // Replace with actual logic to send the WhatsApp message
    // await sendWhatsApp(job.data);
  }

  private async processTelegram (job: Job): Promise<void> {
    // Replace with actual logic to send the Telegram message
    // await sendTelegram(job.data);
  }

  private jobOptions (priority: PriorityLabel = 'normal'): JobsOptions {
    return {
      priority: this.getPriorityValue(priority),
      attempts: environment.queue.maxAttempts,
      backoff: {
        type: 'exponential',
        delay: 5000 // Start with a delay of 5 seconds
      }
    }
  }

  private getPriorityValue (priority: PriorityLabel): number {
    const priorityMapping: Record<PriorityLabel, number> = {
      high: 1,
      normal: Math.floor(2097152 / 2),
      low: 2097152
    }
    const value = priorityMapping[priority]
    if (typeof value !== 'number') {
      throw new Error(`Unknown priority label: ${priority}`)
    }
    return value
  }

  async sendMail (params: any, priority?: PriorityLabel): Promise<void> {
    await this.emailQueue.add(params, this.jobOptions(priority))
  }

  async sendSMS (params: any, priority?: PriorityLabel): Promise<void> {
    await this.smsQueue.add(params, this.jobOptions(priority))
  }

  async sendWhatsApp (params: any, priority?: PriorityLabel): Promise<void> {
    await this.whatsappQueue.add(params, this.jobOptions(priority))
  }

  async sendTelegram (params: any, priority?: PriorityLabel): Promise<void> {
    await this.telegramQueue.add(params, this.jobOptions(priority))
  }
}
