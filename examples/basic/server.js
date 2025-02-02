const fastify = require('fastify')
const socketio = require('../..')
const { join } = require('path')
const { readFile } = require('fs').promises

const app = fastify({ logger: true })

app.register(socketio)

app.get('/', async (req, reply) => {
  app.io.on('connect', () => console.info('Socket connected!'))

  const data = await readFile(join(__dirname, '..', 'index.html'))
  reply.header('content-type', 'text/html; charset=utf-8')
  reply.send(data)
})

app.listen(3000)
