import { type CustomError } from '@domain/errors'
import { type ID } from '@domain/value-objects'

interface Validatable {
  validate: () => CustomError[]
}

export abstract class Entity {
  readonly id: ID
  readonly createdAt: Date
  readonly updatedAt: Date | null
  readonly deletedAt: Date | null

  constructor (data?: Partial<Entity>) {
    if (data) {
      Object.assign(this, data)
    }
    if (!this.createdAt) {
      this.createdAt = new Date()
    }
  }

  validate (): CustomError[] {
    const errors: CustomError[] = []

    for (const key of Object.keys(this)) {
      const property = this[key as keyof Entity]

      if (this.isValidatable(property)) {
        const propertyErrors = property.validate()
        errors.push(...propertyErrors)
      }
    }

    return errors
  }

  private isValidatable (obj: any): obj is Validatable {
    return obj && typeof obj.validate === 'function'
  }
}
