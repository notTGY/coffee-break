const http = require('http');
const router = require('./server/route.js')
const db = require('./db/db.js')

const PORT = 8080

const sleep = (delay) => new Promise(
  (res, rej) => {
    setTimeout(() => res(), delay)
  }
)

db.init()
router.post('/start-break', (body) => {
})
router.get(
  '/',
  async () => {
    await sleep(5000)
    return JSON.stringify({message: 'hi'})
  },
)

http.createServer(async (req, res) => {
  let result
  try {
    result = await router.handle(req)
    res.writeHead(200, {
      'Content-Type': 'application/json'
    })
  } catch (e) {
    res.writeHead(500, {
      'Content-Type': 'application/json'
    })
  }
  res.end(result)
}).listen(PORT)

