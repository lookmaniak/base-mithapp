import m from 'mithril'
import '@node/bootstrap/dist/js/bootstrap.bundle.js'
import Dashboard from '@features/dashboard/ui/dashboard'
import { useAuth } from '@router/router'
import Profile from '@features/profile/ui/profile'
import '@scss/cellpost.scss'
import LoginPage from '@features/auth/ui/login'
import PageWrapper from './app/components/PageWrapper'


 
 m.route(document.getElementById("app"), "/", {
  '/login' : useAuth(LoginPage),                     
  '/' : useAuth({ view: () => m(PageWrapper, m(Dashboard)) }),
  '/profile' : useAuth({ view: () => m(PageWrapper, m(Profile)) }),
})
