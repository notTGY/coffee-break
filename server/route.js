const url = require('url')
const ERROR_MESSAGE = '{"message":"error"}'

const E_UNHANDLED_ENDPOINT = 'UNHANDLED ENDPOINT'

const routes = {}
function register(method, path, handler) {
  if (!routes[path]) {
    routes[path] = {}
  }
  routes[path][method] = handler
}

const post = (...args) => register('POST', ...args)
const get = (...args) => register('GET', ...args)

async function handle(req) {
  const parsedUrl = url.parse(req.url)
  const path = parsedUrl.pathname
  const method = req.method
  let body = ''
  const handler = routes[path]
    ? routes[path][method]
    : null
  if (typeof handler !== 'function') {
    return new Promise((res, rej) => {res(ERROR_MESSAGE)})
  }

  return new Promise((resolve, reject) => {
    req.on('data', data => {
      body += data
      if (body.length > 1000) {
        req.connection.destroy()
        resolve(ERROR_MESSAGE)
      }
    })
    req.on('end', async () => {
      try {
        const parsedBody = JSON.parse(body)
        const result =  await handler(parsedBody)
        resolve(result)
      } catch(e) {
        resolve(ERROR_MESSAGE)
      }
    })
  })
}

module.exports = {
  get,
  post,
  handle,
}
