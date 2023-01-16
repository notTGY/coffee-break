const db = require('../db/db.js')
const { ghAuth } = require('./gh.js')

const handleToggle = async (body) => {
  let message = 'success'

  let clientToken = body.token
  const {
    token,
    error,
  } = ghAuth(clientToken)

  if (error) {
    message = error
  } else {

    let user_id = await db.getUserId(token)

    if (user_id == null) {
      await db.createUser(token)
      user_id = await db.getUserId(token)
    }

    const isRecording = await db.getIsRecording(
      user_id
    )
    if (isRecording) {
      await db.endRecording(user_id)
    } else {
      await db.startRecording(user_id)
    }

  }

  return JSON.stringify({message})
}

const handleStatus = async (body) => {
  let message = 'success'
  let res = null

  let clientToken = body.token
  const {
    token,
    error,
  } = ghAuth(clientToken)

  if (error) {
    message = error
  } else {

    let user_id = await db.getUserId(token)

    if (user_id == null) {
      await db.createUser(token)
      user_id = await db.getUserId(token)
    }

    const isRecording = await db.getIsRecording(
      user_id
    )
    res = isRecording

  }

  return JSON.stringify({message, res})
}

module.exports = {
  handleToggle,
  handleStatus,
}
