import createService from '../../../services/service'

const svc = createService('')

const authService = {
  isProcessing: svc.isProcessing,
  async login(username, password) {
    const req = await svc.noAuth().post('/login', {
      email: username,
      password: password,
    })
  
    if(req.success) {
      localStorage.setItem('access_token', req.data.access_token)
      localStorage.setItem('auth_user', JSON.stringify(req.data.user))  
    }
  
    svc.useAuth()

    return req
  },
  async logout() {
    const req = await svc.post('/logout')

    if(req.success) {
      this.clearSession() 
    }

    return req
  },
  check() {
    return svc.get('user')
  },
  user() {
    return JSON.parse(localStorage.getItem('auth_user'))
  },
  clearSession() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('auth_user')
  }
}

export default authService
