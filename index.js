require('dotenv').config()
const http = require('http')

const router = require('./server/route.js')
const recording = require('./server/recording.js')
const stats = require('./server/stats.js')

const PORT = 3000

router.post(
  '/api/recording/toggle', recording.handleToggle
)
router.post(
  '/api/recording/status', recording.handleStatus
)

router.post(
  '/api/stats', stats.handle
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

