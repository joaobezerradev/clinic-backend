import { NodeHttp } from '@infra/http/node-http'

const server = new NodeHttp()

server.post('/user/:id', async (req, res) => {
  res.json({ params: req.params, query: req.query, body: req.body, headers: req.headers })
  // A partir daqui, você poderia, por exemplo, consultar um banco de dados para buscar o usuário com o ID fornecido.
  // Como é apenas um exemplo, vamos retornar um usuário mock.
})

server.start(3000, () => {
  console.log('Server is running on port 3000')
})
