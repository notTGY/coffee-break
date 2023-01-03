const url = require('url')

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
  const body = ''
  const handler = routes[path]
    ? routes[path][method]
    : null
  if (typeof handler !== 'function') {
    return new Promise((res, rej) => {res(null)})
  }

  return new Promise((resolve, reject) => {
    req.on('data', data => {
      body += data
      if (body.length > 1000) {
        req.connection.destroy()
        resolve(null)
      }
    })
    req.on('end', async () => {
      try {
        const parsedBody = JSON.parse(body)
        const prom = handler(parsedBody)
        return await prom
      } catch(e) {
        resolve(null)
      }
    })
  })
}

module.exports = {
  get,
  post,
  handle,
}
