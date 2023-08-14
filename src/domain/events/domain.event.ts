export interface DomainEvent {
  eventId: string
  occurredOn: Date
  eventType: Type
  data: object[]
}

type context = 'user'
type action = 'created' | 'updated' | 'deleted'

type Type = `${context}.${action}`
