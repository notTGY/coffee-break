const EGH_AUTH = 'gh auth failed'

const ghAuth = (clientToken) => {
  let error = null

  const token = clientToken

  return {
    token,
    error,
  }
}


module.exports = {
  ghAuth,
}
