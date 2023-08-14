import { type DomainEvent } from '@domain/events'

import { type EventBus } from './event-bus'

export class QueueEventBus implements EventBus {
  constructor (private readonly queueProducer: QueueProducer) {}

  async publish (events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      await this.queueProducer.send(event)
    }
  }
}
