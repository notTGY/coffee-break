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
  if (typeof handler === 'function') {
    return routes[path][method](body)
  } else {
    return null
  }
}

module.exports = {
  get,
  post,
  handle,
}
