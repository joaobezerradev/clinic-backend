export class CreatePlaceCommand {
  constructor (
    readonly name: string,
    readonly planId: string,
    readonly couponCode?: string
  ) { }
}
