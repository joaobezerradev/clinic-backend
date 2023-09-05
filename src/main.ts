import { environment } from '@infra/config/environment'
import { HttpServerAdapter } from '@infra/http'

export const server = new HttpServerAdapter()

server.start(() => { console.log(`Server is running on port: ${environment.http.port}`) })
