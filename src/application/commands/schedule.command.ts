export class CreateSchedulesCommand {
  constructor (
    readonly roomId: string,
    readonly schedules: Array<{
      startTime: Date
      endTime: Date
      professionalId: string
    }>
  ) { }
}
