const http = require('http');
const router = require('./server/route.js')
const db = require('./db/db.js')

const PORT = 3000

router.post('/api/start-recording', async (body) => {
  let token = body.token
  let user_id = await getUserId(token)
  if (user_id == null) {
    token = await createUser()
    user_id = await getUserId(token)
  }
  await db.startRecording(user_id)
  token = await updateTokenForUser(user_id)
  return JSON.stringify({token})
})
router.post('/api/end-recording', async (body) => {
  let token = body.token
  let user_id = await getUserId(token)
  if (user_id == null) {
    token = await createUser()
    user_id = await getUserId(token)
  }
  await db.endRecording(user_id)
  token = await updateTokenForUser(user_id)
  return JSON.stringify({token})
})

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

