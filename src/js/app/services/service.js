import m from 'mithril'
import stream from 'mithril/stream'
import { req } from '../../core/network/request'
import HttpException from '../../core/exceptions/HttpException'
import authService from '../features/auth/services/auth_service'

function createService(basePath) {
                                   
  const hostName = import.meta.env.VITE_API_URL 
  const prefix = import.meta.env.VITE_API_PREFIX
  const authHeader = () => { return { 'Authorization' : `Bearer ${localStorage.getItem('access_token')}` } }
  

  req.hostName = hostName
  req.prefix = prefix
  req.authHeader = authHeader
  req.basePath = basePath

  const isProcessing = stream(false)
  
   return {
    isProcessing,  
    async _executeRequest(fn) {
        HttpException.clear()
        this.isProcessing(true)
        try {
           return await fn()
        } catch (err) {
          if(err.code == 401) {
            authService.clearSession()
            m.route.set('/login')
          } 
          return HttpException.parse(err)
        } finally {
            this.isProcessing(false)        
        }             
    },
    get(path, body = {}, params = {}, headers = {}) {
      return this._executeRequest(() => req.get(path, body, params, headers))                                    
     },
    post(path, body = {}, params = {}, headers = {}) {
      return this._executeRequest(() => req.post(path, body, params, headers))                                    
     },
    put(path, body = {}, params = {}, headers = {}) {
      return this._executeRequest(() => req.put(path, body, params, headers))                                    
     },
    patch(path, body = {}, params = {}, headers = {}) {
      return this._executeRequest(() => req.patch(path, body, params, headers))                                    
     },
    delete(path, body = {}, params = {}, headers = {}) {
      return this._executeRequest(() => req.delete(path, body, params, headers))                                    
    },
    noAuth() {
      req.noAuth()
      return this
    },
    useAuth() {
      req.useAuth()
      return this
    }
   }
    
}

export default createService
