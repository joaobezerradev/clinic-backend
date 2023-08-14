export class CreateSchedulesCommand {
  constructor (
    readonly roomId: string,
    readonly schedules: Array<{
      startAt: Date
      endsAt: Date
      professionalId: string
    }>
  ) { }
}
