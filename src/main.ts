import 'module-alias/register'

import { Plan } from '@domain/entities'

const plan = Plan.create({ name: 'A b', price: 0 })

const e = plan.validate()
console.log(e)
