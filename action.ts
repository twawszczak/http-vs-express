import { Readable } from 'stream'

export async function action (stream: Readable): Promise<string> {
  const pong = 'pong'

  let data = ''

  stream.on('data', (chunk) => {
    data += chunk
  })

  await new Promise((resolve, _reject) => {
    stream.once('end', () => {
      resolve()
    })
  })

  const parsedData = JSON.parse(data)

  if (parsedData && parsedData instanceof Object && parsedData.ping === pong) {
    return JSON.stringify({
      pong
    })
  } else {
    throw new Error('invalid request')
  }
}