const http = require('http');
const router = require('./server/route.js')

const PORT = 3000

router.post('/api/start-break', (body) => {
})
router.get(
  '/api',
  async () => {
    return JSON.stringify({message: 'hi'})
  },
)

http.createServer(async (req, res) => {
  console.log('hit')
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

