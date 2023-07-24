/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import fs from 'node:fs'

export const router = Router()

fs.readdirSync(__dirname).forEach(async (file) => {
  if (!file.startsWith('index.')) {
    const route = await import(`./${file}`)
    router.use(route.default)
  }
})
