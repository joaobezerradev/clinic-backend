import { type Patient } from '@domain/entities'

export interface PatientRepository {
  findByDocument: (document: string) => Promise<Patient | null>
  findByEmail: (email: string) => Promise<Patient | null>
  save: (place: Patient) => Promise<void>
}
