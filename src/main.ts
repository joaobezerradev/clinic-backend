import { HttpServerAdapter } from '@infra/http'

export const server = new HttpServerAdapter()

// server.post('/patient', async (req, res) => { res.accepted() })

server.start(() => { console.log('Server is running on port 3000') })
