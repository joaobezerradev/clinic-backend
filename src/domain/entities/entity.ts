import { type CustomError } from '@domain/errors'

interface Validatable {
  validate: () => CustomError[]
}

export abstract class Entity {
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
