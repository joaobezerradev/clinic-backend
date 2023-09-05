export interface PostalCode {
  getAddress: (postalCode: string) => Promise<PostalCode.Address | null>
}

export namespace PostalCode {
  export type Address = {
    postalCode: string
    state: string
    city: string
    street: string
    neighborhood: string
  }
}
