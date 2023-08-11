export interface Handler<Input, Output> {
  handle: (params: Input) => Promise<Output>
}
