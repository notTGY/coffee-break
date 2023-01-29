const db = require('../db/db.js')
const { ghAuth } = require('./gh.js')

const COUNT = 'c'
const DELAY = 'd'
const LENGTH = 'l'
const CHILL = 'i'

const calculateMetricsFromRange = (recordings, start, end) => {
  const res = {}
  const range = recordings.filter(
    (rec) =>
      rec.start_time < end && rec.end_time > start
  )
  res[COUNT] = range.length
  res[DELAY] = 0
  res[LENGTH] = 0
  for (let i = 0; i < range.length; i++) {
    const rec = range[i]
    const length = rec.end_time - rec.start_time 
    res[LENGTH] += length
    if (i > 0) {
      const delay = rec.start_time - range[i-1].end_time
      res[DELAY] += delay
    }
  }
  res[CHILL] = res[DELAY]
    ? Math.ceil(100 * res[LENGTH] / res[DELAY])
    : 0

  res[LENGTH] = res[COUNT]
    ? Math.ceil(res[LENGTH] / res[COUNT])
    : 0
  res[DELAY] = res[COUNT]
    ? Math.ceil(res[DELAY] / res[COUNT])
    : 0
  return res
}
const constructDataFromRecordings = (recordings, start) => {
  const end = start + 7 * 86400000
  const week = calculateMetricsFromRange(recordings, start, end)
  const timestamps = new Array(7).fill(0, 0, 7).map(
    (_, index) => start + index * 86400000
  )
  const dailyData = timestamps.map(
    (timestamp) =>
      calculateMetricsFromRange(
        recordings, timestamp, timestamp + 86400000
      )
  )
  const day = {}

  day[COUNT] = dailyData.map(data => data[COUNT])
  day[LENGTH] = dailyData.map(data => data[LENGTH])
  day[CHILL] = dailyData.map(data => data[CHILL])
  day[DELAY] = dailyData.map(data => data[DELAY])

  return {
    week,
    day,
  }
}

const handle = async (body) => {
  let res
  let message = 'success'

  let clientToken = body.token
  const start = body.start
  const {
    token,
    error,
  } = await ghAuth(clientToken)

  if (error) {
    message = error
  } else {

    let user_id = await db.getUserId(token)

    if (user_id == null) {
      await db.createUser(token)
      user_id = await db.getUserId(token)
    }

    const recordings = await db.getRecordingsFrom(
      user_id, start
    )

    res = constructDataFromRecordings(recordings, start)
  }

  return JSON.stringify({message, res})
}

module.exports = {
  handle,
}
