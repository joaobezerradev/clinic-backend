import env from 'env-var'

interface Environment {
  database: {
    url: string
  }
  http: {
    port: number
  }
}

export const environment: Environment = {
  database: {
    url: env.get('DATABASE_URL').required().asString()
  },
  http: {
    port: env.get('HTTP_PORT').required().asInt()
  }
}
