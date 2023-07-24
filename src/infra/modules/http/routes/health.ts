import { Router } from 'express'

const healthRouter = Router()

export default healthRouter
healthRouter.get('/health', (_req, res) => {
  return res.json({ status: 'UP' })
})
