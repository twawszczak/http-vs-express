import * as express from 'express'
import { action } from '../action'

const app = express()

app.post('/ping', async (request, response) => {
  try {
    response.end(await action(request))
  } catch (e) {
    response.sendStatus(404)
  }
})

const port = Number(process.env.PORT) || 3001

app.listen(port)

console.info('Listening on ' + port + ' port')