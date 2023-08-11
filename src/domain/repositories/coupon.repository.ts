import { type Coupon } from '@domain/entities'

export interface CouponRepository {
  findByCode: (name: string) => Promise<Coupon | null>
  save: (coupon: Coupon) => Promise<void>
}
