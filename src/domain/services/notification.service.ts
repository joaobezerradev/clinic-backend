export interface NotificationService {
  sendMail: (params: any) => Promise<void>
  sendSMS: (params: any) => Promise<void>
  sendWhatsApp: (params: any) => Promise<void>
  sendTelegram: (params: any) => Promise<void>
}
