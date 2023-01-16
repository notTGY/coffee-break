require('dotenv').config()

const db = require('./db/db.js')
if (process.env.UPDATE_DB) {
  console.log('updating DB!!!')
  db.setup()
}
