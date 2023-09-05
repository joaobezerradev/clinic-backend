export interface Handler<Input, Output> {
  readonly name: string
  handle: (params: Input) => Promise<Output>
}
