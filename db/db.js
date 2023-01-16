const pg = require('pg')
const { resolve } = require('path')
const { readFileSync } = require('fs')

const SCHEMA_FILE = resolve(__dirname, 'schema.sql')
const E_DB_NOT_OPEN = 'Database is not open'

class Client {
  constructor() {
    this.C = new pg.Client({
      host: process.env.HOST,
      user: process.env.USERNAME,
      database: process.env.DATABASE,
      password: process.env.PASSWORD,
    })
  }
}

async function setup() {
  try {
    with(new Client) {
      await C.connect()
      const schema = readFileSync(SCHEMA_FILE, 'utf8')
      await C.query(schema)
      await C.end()
    }
  } catch (e) {
    console.log(e)
  }
}

async function startRecording(
  user_id, location='unknown', purpose='coffee',
) {
  if (user_id == null) return null

  try {
    with(new Client) {
      await C.connect()
      await C.query(
        `INSERT INTO breaks (
          user_id, location, purpose, is_finished
        ) VALUES ($1, $2, $3, FALSE)
        `,
        [user_id, location, purpose]
      )
      await C.end()
    }
  } catch (e) {
    console.log(e)
  }
}

async function endRecording(user_id) {
  try {
    with (new Client) {
      const endTime = new Date()
      await C.connect()
      await C.query(
        `UPDATE breaks
        SET end_time = $1, is_finished = TRUE
        WHERE user_id = $2 AND is_finished = FALSE
        `,
        [endTime, user_id]
      )
      await C.end()
    }
  } catch (e) {
    console.log(e)
  }
}

async function getIsRecording(user_id) {
  try {
    with (new Client) {
      await C.connect()
      const res = await C.query(
        `SELECT * FROM breaks
        WHERE user_id = $1 AND is_finished = FALSE
        `,
        [user_id]
      )
      await C.end()
      return Boolean(res.rows[0])
    }
  } catch (e) {
    console.log(e)
  }
}

async function getUserId(token) {
  if (token == null) return null

  try {
    with (new Client) {
      await C.connect()
      const res = await C.query(
        'SELECT (id) FROM users WHERE gh_token = $1',
        [token]
      )
      await C.end()
      return res.rows[0] ? res.rows[0].id : null
    }
  } catch (e) {
    console.log(e)
  }
}

async function createUser(token) {
  try {
    with (new Client) {
      const now = new Date()
      await C.connect()
      await C.query(
        `INSERT INTO users (
          last_seen, gh_token
        ) VALUES ($1, $2)
        `,
        [now, token]
      )
      await C.end()
    }
  } catch (e) {
    console.log(e)
  }
}

async function getRecordingsFrom(user_id, start) {
  const end = start + 7 * 86400000
  try {
    with (new Client) {
      await C.connect()
      const res = await C.query(
        `SELECT * FROM breaks
        WHERE user_id = $1 AND start_time < $3 AND end_time > $2
        `,
        [user_id, new Date(start), new Date(end)]
      )
      await C.end()
      return res.rows
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  setup,
  startRecording,
  endRecording,
  getIsRecording,
  getUserId,
  createUser,
  getRecordingsFrom,
}
