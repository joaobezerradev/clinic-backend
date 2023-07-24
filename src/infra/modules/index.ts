import { type Module } from '@infra/shared/interfaces'
import { HttpModule } from '@infra/modules/http'

export const modules: Module[] = [
  new HttpModule()
]
