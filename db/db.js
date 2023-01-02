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


module.exports = {
  setup,
  startRecording,
  endRecording,
}
