export class CreateSchedulesCommand {
  constructor (
    readonly schedules: Schedule[],
    readonly roomId: string
  ) { }
}

type Schedule = {
  startTime: Date
  endTime: Date
  professionalId: string
}
