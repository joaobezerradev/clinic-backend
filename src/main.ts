import { modules } from './infra/modules'

void (async () => {
  for (const module of modules) {
    await module.start()
  }
})()
