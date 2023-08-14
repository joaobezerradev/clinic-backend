import { EventEmitter2 } from 'eventemitter2'

class EventBus {
  private readonly emitter: EventEmitter2

  constructor () {
    this.emitter = new EventEmitter2({
      wildcard: true,
      maxListeners: 20,
      delimiter: ':',
      newListener: false,
      removeListener: false
    })
  }

  subscribe (event: string, listener: (...args: any[]) => void): void {
    this.emitter.on(event, listener)
  }

  unsubscribe (event: string, listener: (...args: any[]) => void): void {
    this.emitter.off(event, listener)
  }

  publish (event: string, ...args: any[]): void {
    this.emitter.emit(event, ...args)
  }
}

// Example usage:

function onEventReceived (data: string): void {
  console.log(`Event received with data: ${data}`)
}

function anotherEventHandler (data: string): void {
  console.log(`Another event handler received data: ${data}`)
}

// Create the event bus
const bus = new EventBus()

// Subscribe to an event
bus.subscribe('MY_EVENT', onEventReceived)
bus.subscribe('MY_EVENT', anotherEventHandler)

// Publish the event
bus.publish('MY_EVENT', 'Hello, EventBus!')

// Expected Output:
// Event received with data: Hello, EventBus!
// Another event handler received data: Hello, EventBus!
