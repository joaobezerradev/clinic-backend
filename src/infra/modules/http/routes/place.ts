/* eslint-disable @typescript-eslint/no-misused-promises */
import { prisma } from '@infra/modules/database'
import { PlaceRepository } from '@infra/modules/database/repositories'
import { Router } from 'express'

const router = Router()

const placeRepository = new PlaceRepository(prisma)

router.get('/place', async (_req, res) => {
  const data = await placeRepository.findAll()
  res.json(data)
})

router.post('/place', async (req, res) => {
  await placeRepository.save(req.body)
  res.status(204).send()
})

export default router
