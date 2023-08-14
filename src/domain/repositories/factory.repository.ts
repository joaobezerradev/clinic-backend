import { type CouponRepository, type PatientRepository, type PlaceRepository, type PlanRepository } from '@domain/repositories'

export interface FactoryRepository {
  createPlanRepository: () => PlanRepository
  createPatientRepository: () => PatientRepository
  createPlaceRepository: () => PlaceRepository
  createCouponRepository: () => CouponRepository
}
