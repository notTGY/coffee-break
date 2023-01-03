const url = require('url')
const EUNHANDLED = '{"message":"unhandled"}'
const ETOO_MUCH_DATA = '{"message":"too much data"}'
const ERUNTIME = '{"message":"RE"}'

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
    return new Promise((res, rej) => {res(EUNHANDLED)})
  }

  return new Promise((resolve, reject) => {
    req.on('data', data => {
      body += data
      if (body.length > 1000) {
        req.connection.destroy()
        resolve(ETOO_MUCH_DATA)
      }
    })
    req.on('end', async () => {
      let parsedBody
      try {
        parsedBody = JSON.parse(body)
      } catch(e) {
        parsedBody = {}
      }
      try {
        const result =  await handler(parsedBody)
        resolve(result)
      } catch(e) {
        console.log(e)
        resolve(ERUNTIME)
      }
    })
  })
}

module.exports = {
  get,
  post,
  handle,
}
