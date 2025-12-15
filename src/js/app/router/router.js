import m from 'mithril'
import authService from "../features/auth/services/auth_service"

const authPath = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/verify-phone'
]


export function useAuth(component) {
  return {
    onmatch(args, requestPath) {
      if(!authService.user() && authPath.includes(requestPath)) {
        return component
      } else if (authService.user() && authPath.includes(requestPath)){
        m.route.set('/')
      } else if (!authService.user()) {
        m.route.set('/login')         
      } else { 
        return component         
      }

      console.log(args)
    }         
  }                              
}
