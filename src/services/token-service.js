let key = 'whocares'

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(key, token)
  },

  getAuthToken() {
    return window.localStorage.getItem(key)
  },

  clearAuthToken() {
    window.localStorage.removeItem(key)
  },

  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },

  makeBasicAuthToken(email, password) {
    return window.btoa(`${email}:${password}`)
  }
}

export default TokenService;
