import { z } from 'zod'
import dotenv from 'dotenv'

dotenv.config()

const envVarsSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test', 'provision']).default('development'),
  HTTP_PORT: z.number(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_PORT: z.number()
})

type envVarsType = z.infer<typeof envVarsSchema>

let env: envVarsType

try {
  env = envVarsSchema.parse({
    HTTP_PORT: +process.env.HTTP_PORT!,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_PORT: +process.env.DB_PORT!

  })
} catch (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

export const environment = {
  HTTP_PORT: env.HTTP_PORT,
  DB_USER: env.DB_USER,
  DB_PASS: env.DB_PASS,
  DB_PORT: env.DB_PORT
}
