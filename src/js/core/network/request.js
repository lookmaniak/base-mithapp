import m from 'mithril'


const Request = {
    baseHeaders: {},                                
    baseParams: {},
    hostName: '',
    prefix: '',
    authHeader: () => {},
    noAuth: function(){
      this._useAuthHeader = false
      return this
    },
    useAuth: function() {
      this._useAuthHeader = true
      return this
    },
    _getBaseHeaders: function() {
      return this._useAuthHeader ? {
        ...this.authHeader(),
        ...this.baseHeaders,
      } : {
        ...this.baseHeaders      
      }                        
    },
    _useAuthHeader: true,
    _buildConfig(method, path, body = {}, params = {}, headers = {}) {
      return {
        method: method,
        url: this.hostName + this.prefix + this.basePath + path,
        params: {
          ...this.baseParams,
          ...params,
        },
        body: body,
        headers: {
          ...this._getBaseHeaders(),
          ...headers,
        }
      }                                                         
    },
    get(path, params = {}, headers = {}) {
      return m.request(this._buildConfig('get', path, {}, params, headers))                                       
   },
    post(path, body = {}, params = {}, headers = {}) {
      return m.request(this._buildConfig('post', path, body, params, headers))                                                 
    },
    put(path, body = {}, params = {}, headers = {}) {
      return m.request(this._buildConfig('put', path, body, params, headers))                                                 
   },
    delete(path, params = {}, headers = {}) {
      return m.request( this._buildConfig('delete', path, {}, params, headers))                                         
   },
    patch(path, body = {}, params = {}, headers = {}) {
      return m.request(this._buildConfig('patch', path, body, params, headers))                                                   
   }
 
 }

export const req = Request
