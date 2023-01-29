const axios = require('axios')
const EGH_AUTH = 'gh auth failed'
const MAX_TIMEOUT = 1000 * 60 * 60 * 24

const cache = {}

const ghAuth = async (clientToken) => {
  let error = null
  let token = null

  const cached = cache[clientToken]
  const now = Date.now()
  if (cached && now - cached.now < MAX_TIMEOUT) {
    token = cached.token

    return {
      token,
      error,
    }
  } else if (cached && now - cached.now >= MAX_TIMEOUT) {
    delete cache[clientToken]
  }

  try {
    const tokenData = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: process.env.GH_ID,
      client_secret: process.env.GH_SECRET,
      code: clientToken,
    }, {
      headers: {
        'Accept': 'application/json',
      }
    })
    if (tokenData.data && tokenData.data.error) {
      throw tokenData.data.error
    }
    const accessToken = tokenData.data.access_token

    const userData = await axios.get('https://api.github.com/user', {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'X-Github-Api-Version': '2022-11-28',
        'Accept': 'application/vnd.github+json',
      }
    })
    if (userData.data && userData.data.error) {
      throw userData.data.error
    }
    token = userData.data.id

    cache[clientToken] = {
      token,
      now,
    }
  } catch(e) {
    console.log(e)
    error = EGH_AUTH
  }

  return {
    token,
    error,
  }
}


module.exports = {
  ghAuth,
}
