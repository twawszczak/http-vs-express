export async function action (inputData: {[key: string]: string | number | boolean}): Promise<string> {
  const pong = 'pong'

  if (inputData && inputData instanceof Object && inputData.ping === pong) {
    return JSON.stringify({
      pong
    })
  } else {
    throw new Error('invalid request')
  }
}