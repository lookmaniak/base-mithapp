const HttpException = {
  parse(err) {
      this.code = err.code
      this.message = err.response.message
      this.errors = err.response.errors ?? {}
      Object.keys(this.errors).map( k => {
        const errors = err.response.errors[k]
        this[k] = typeof errors == 'string' ? errors : errors.join(', ')
      })

      return {
        success: false,
        errors: this.errors,
        message: this.message,
        code: this.code
      }
  },
  clear() {
    Object.keys(this).map( k => {
      if(typeof this[k] !== 'function') delete this[k]                             
    })         
  },          
   
 }

export default HttpException

