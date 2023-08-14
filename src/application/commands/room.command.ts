export class CreateRoomCommand {
  constructor (
    readonly placeId: string,
    readonly name: string
  ) { }
}
