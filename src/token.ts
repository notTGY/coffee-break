export const setToken = (val) => {
  window.localStorage.setItem('token', val)
}
export const getToken = () => {
  window.localStorage.getItem('token')
}
