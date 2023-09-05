import cep from 'cep-promise'

import { type PostalCode } from './postal-code'

export class PostalCodeAdapter implements PostalCode {
  async getAddress (postalCode: string): Promise<PostalCode.Address | null> {
    try {
      const result = await cep(postalCode)

      return {
        street: result.street,
        city: result.city,
        neighborhood: result.neighborhood,
        state: result.state,
        postalCode: result.cep
      }
    } catch {
      return null
    }
  }
}
