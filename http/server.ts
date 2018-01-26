import * as http from 'http'
import { action } from '../action'

const server = http.createServer(async (incomingMessage, response) => {
  if (incomingMessage.method === 'POST' && incomingMessage.url === '/ping') {

    let data = ''

    incomingMessage.on('data', (chunk) => {
      data += chunk
    })

    await new Promise((resolve, _reject) => {
      incomingMessage.once('end', () => {
        resolve()
      })
    })

    const parsedData = JSON.parse(data)

    try {
      response.end(await action(parsedData))
      return
    } catch (e) {}

  }

  response.statusCode = 404
  response.end('')
})

const port = Number(process.env.PORT) || 3000

server.listen(port)

console.info('Listening on ' + port + ' port')