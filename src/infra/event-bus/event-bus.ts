import { type DomainEvent } from '@domain/events'

export interface EventBus {
  publish: (events: DomainEvent[]) => Promise<void>
}
