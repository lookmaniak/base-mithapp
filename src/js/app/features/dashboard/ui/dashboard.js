import m from 'mithril'
import authService from '../../auth/services/auth_service'

const Dashboard = {
  oninit(vnode) {
     vnode.state.user = authService.user()
   },
   view(vnode) {
      return m('div', [
                      
      m('div', m('h1', `Howdy, ${vnode.state.user?.name}!`)),
      
      m('div', m('h3', m(m.route.Link, { href: '/profile' },  `Your email is, ${vnode.state.user?.email}`))),
      m('div', [m('h6', 'Wanna logout? '), m('button', {
          onclick: async e => {
          e.preventDefault()

          const req = await authService.logout()

          if(req.success) {
           m.route.set("/login")                 
           }
         }                                    
       }, authService.isProcessing() ? 'Processing...' : 'Click here!')])
     ])
   }
 }


export default Dashboard
