const sqlite3 = require('sqlite3')
const { resolve } = require('path')
const { readFileSync } = require('fs')

const DB_FILE = './sqlite/coffeebreak.db'
const SCHEMA_FILE = resolve(__dirname, 'schema.sql')
const E_DB_NOT_OPEN = 'Database is not open'


const db = {
  open() {
    this.database = new sqlite3.Database(DB_FILE)
  },
  close() {
    if (!this.database) {
      return new Error(E_DB_NOT_OPEN)
    }
    this.database.close()
  },
  execAsync(...args) {
    if (!this.database) {
      return new Error(E_DB_NOT_OPEN)
    }
    return new Promise((resolve, reject) => {
      this.database.exec(...args, function(error) {
        if (error) {
          reject(error)
        } else {
          resolve()
        }
      })
    })
  },
  getAsync(...args) {
    if (!this.database) {
      return new Error(E_DB_NOT_OPEN)
    }
    return new Promise((resolve, reject) => {
      this.database.get(...args, function(error, row) {
        if (error) {
          reject(error)
        } else {
          resolve(row)
        }
      })
    })
  },
}

async function setup() {
  try {
    db.open()
    const schema = readFileSync(SCHEMA_FILE, 'utf8')
    await db.execAsync(schema)
    db.close()
  } catch (e) {
    console.log(e)
  }
}

async function startRecording(
  user_id, location='unknown', purpose='coffee',
) {
  try {
    db.open()
    await db.execAsync(
      `INSERT INTO coffee_breaks (
        user_id, location, purpose
      ) VALUES (?, ?, ?)
      `,
      [user_id, startTime, location, purpose]
    )
    db.close()
  } catch (e) {
    console.log(e)
  }
}

async function endRecording(user_id) {
  try {
    const endTime = new Date()
    db.open()
    await db.execAsync(
      `UPDATE coffee_breaks
      SET end_time = ?
      WHERE user_id = ? AND end_time = NULL
      `,
      [endTime, user_id]
    )
    db.close()
  } catch (e) {
    console.log(e)
  }
}

async function getUserId(token) {
  try {
    db.open()
    const res = await db.getAsync(
      'SELECT (user_id) WHERE token = ?',
      [token]
    )
    db.close()
    return res ? res.user_id : null
  } catch (e) {
    console.log(e)
  }
}

async function createUser() {
  try {
    const now = new Date()
    const token = Math.floor(Math.random() * 1e10)
    db.open()
    await db.execAsync(
      `INSERT INTO users
      (last_seen, token)
      VALUES (?, ?, ?)
      `,
      [now, token]
    )
    db.close()
    return token
  } catch (e) {
    console.log(e)
  }
}

async function updateTokenForUser(user_id) {
  try {
    const now = new Date()
    const token = Math.floor(Math.random() * 1e10)
    db.open()
    await db.execAsync(
      `UPDATE users
      SET last_seen = ?, token = ?
      WHERE user_id = ?
      `,
      [now, token, user_id]
    )
    db.close()
    return token
  } catch (e) {
    console.log(e)
  }
}


module.exports = {
  setup,
  startRecording,
  endRecording,
}
