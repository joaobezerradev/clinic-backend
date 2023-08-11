export class CustomError {
  constructor (
    readonly message: string,
    readonly field?: string,
    readonly value?: unknown
  ) { }
}
