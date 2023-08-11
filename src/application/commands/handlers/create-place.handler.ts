import { Place } from '@domain/entities'
import { FieldError } from '@domain/errors'
import { type CouponRepository, type PlanRepository, type PlaceRepository } from '@domain/repositories'
import { type CreatePlaceCommand } from 'application/commands'
import { type Handler } from 'application/interfaces'

export class CreatePlaceHandler implements Handler<CreatePlaceCommand, void> {
  constructor (
    private readonly placeRepository: PlaceRepository,
    private readonly couponRepository: CouponRepository,
    private readonly planRepository: PlanRepository
  ) { }

  async handle (command: CreatePlaceCommand): Promise<void> {
    const plan = await this.planRepository.findById(command.planId)
    if (!plan) throw new FieldError('Plan not found.', 'planId', command.planId)

    if (command.couponCode) {
      const foundCoupon = await this.couponRepository.findByCode(command.couponCode)

      if (foundCoupon) {
        foundCoupon.applyTo(plan.state().price)
      }
    }

    const placeAleadyExists = await this.placeRepository.findByName(command.name)
    if (placeAleadyExists) throw new FieldError('Place already exists.', 'name', command.name)

    const place = Place.create(command)
    await this.placeRepository.save(place)
  }
}
