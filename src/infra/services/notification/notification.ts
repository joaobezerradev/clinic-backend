export interface Notification {
  sendMail: (params: Notification.SendMail) => Promise<void>

}

export namespace Notification {
  export type SendMail = { to: string[] }
}
