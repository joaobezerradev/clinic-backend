import 'module-alias/register'

import { Plan } from '@domain/entities'
import { LoggerWinston } from '@infra/logger'

const plan = Plan.create({ name: 'A b', price: 0 })

const e = plan.validate()
const l = new LoggerWinston()
l.info(JSON.stringify(e, undefined, 2))
