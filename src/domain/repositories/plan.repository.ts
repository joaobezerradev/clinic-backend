import { type Plan } from '@domain/entities'

export interface PlanRepository {
  findById: (id: string) => Promise<Plan | null>
  save: (plan: Plan) => Promise<void>
}
