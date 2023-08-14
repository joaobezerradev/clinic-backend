export interface PaymentGateway {
  pay: (params: object) => Promise<void>
}
