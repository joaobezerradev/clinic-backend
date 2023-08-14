import { type CreatePlaceCommand } from '@application/commands'
import { type Handler } from '@application/handlers'
import { Place } from '@domain/entities'
import { PlaceAlreadyExistsException, PlanNotFoundException } from '@domain/exceptions'
import { type CouponRepository, type PlaceRepository, type PlanRepository } from '@domain/repositories'

export class CreatePlaceHandler implements Handler<CreatePlaceCommand, void> {
  constructor (
    private readonly placeRepository: PlaceRepository,
    private readonly couponRepository: CouponRepository,
    private readonly planRepository: PlanRepository
  ) { }

  async handle (command: CreatePlaceCommand): Promise<void> {
    const plan = await this.planRepository.findById(command.planId)
    if (!plan) throw new PlanNotFoundException('planId')

    if (command.couponCode) {
      const foundCoupon = await this.couponRepository.findByCode(command.couponCode)

      if (foundCoupon) {
        foundCoupon.applyTo(plan.price.value)
      }
    }

    const placeAleadyExists = await this.placeRepository.findByName(command.name)
    if (placeAleadyExists) throw new PlaceAlreadyExistsException('name')

    const place = Place.create(command)
    await this.placeRepository.save(place)
  }
}
