export const EGH_AUTH = 'gh auth failed'
const GITHUB_CLIENT_ID = '22c1513e621ddbb25ba7'

const setTokenToStorage = (val) =>
  window.localStorage.setItem('token', val)
const getTokenFromStorage = () =>
  window.localStorage.getItem('token')

export const requestGHToken = () =>
  window.location.assign(
    `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`
  )

const paramsString = window.location.search
const params = new URLSearchParams(paramsString)
const token = params.get('code')
if (token) {
  setTokenToStorage(token)
}

export const getToken = () => {
  const token = getTokenFromStorage()
  if (token) {
    return token
  } else {
    requestGHToken()
  }
}

