import m from 'mithril'
import authService from "../features/auth/services/auth_service"
import Dashboard from '@features/dashboard/ui/dashboard'
import Profile from '@features/profile/ui/profile'
import UsersPage from '@features/users/pages/UsersPage'
import LoginPage from '@features/auth/ui/login'
import PageWrapper from '../components/PageWrapper'

const ComingSoon = { view: () => 'Coming Soon!' }

const authPath = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/verify-phone'
]

export const appRoutes = [ 
  { type: 'group', name: 'OVERVIEW', routes: [
    { path: '/', component: Dashboard, title: 'Dashboard', icon: 'layout-dashboard', useWrapper: true },
    { path: '/profile', component: Profile, title: 'Profil Pengguna', icon: 'user', useWrapper: true },
  ]},
  { type: 'group', name: 'MANAGEMENT', routes: [
    { path: '/users', title: 'Pengguna', icon: 'users', childRoutes: [
      { path: '/users', component: UsersPage, title: 'Daftar Pengguna', useWrapper: true },
      { path: '/users/settings', component: ComingSoon, title: 'Pengaturan Pengguna', useWrapper: true },
    ]},
  ]},
  { path: '/login', component: LoginPage, title: 'Login', icon: 'login', useWrapper: false, hidden: true }
]

const useWrapper = (component) => {
  return { view: () => m(PageWrapper, m(component))}                                    
}

export const getSidebarMenu = () => {
  return appRoutes.filter( i => !i.hidden).map( item => {
    if(item.type == 'group') return [
      m('.sidebar-section-label', item.name ),
      item.routes.map( route => {
        if(route.childRoutes) {
          return [
            m(`a.nav-link[data-bs-toggle=collapse][href="#menu${route.path.replaceAll('/', '-')}"]`, [
              m(`i[data-lucide=${route.icon ?? 'user'}].sidebar-icon`), 
              m('span.menu-text', route.title ) 
            ]),
            m(`.collapse#menu${route.path.replaceAll('/','-')}`,
            m('ul.nav.flex-column.ms-4.mb-2',
              route.childRoutes.map( child => {
                return m('li', m(m.route.Link, { href: child.path, className: 'nav-link' }, child.title ))
              })
            ))
          ]
        } else {
          return m(m.route.Link, { href: route.path, className: 'nav-link' }, [
              m(`i[data-lucide=${route.icon}].sidebar-icon`), 
              m('span.menu-text', route.title ) 
          ])         
        }
      })
    ]

    return m(m.route.Link, { href : item.path }, item.title )
  }) 
}

export const getMobileSidebarMenu = () => {
  return m(".offcanvas-body.p-2",
    appRoutes.filter(item => !item.hidden).map(item => {
      if (item.type === "group") {
        return m(".mobile-menu-section.mt-3", [
          m(".text-uppercase.small.fw-semibold.opacity-50.px-2.mb-1", item.name),

          item.routes.map(route => {
            if (route.childRoutes) {
              const collapseId = `m-${route.path.replaceAll("/", "-")}`;
              return [
                m("a.nav-link.mobile-nav-link[data-bs-toggle=collapse]", { href: `#${collapseId}` }, [
                  m(`i[data-lucide=${route.icon ?? "user"}]`),
                  m("span.flex-grow-1", route.title),
                  m("i[data-lucide='chevron-down']")
                ]),
                m(`.collapse#${collapseId}.ps-4`,
                  route.childRoutes.map(child =>
                    m(m.route.Link, { className: "nav-link mobile-sub-link", href: child.path }, child.title)
                  )
                )
              ];
            } else {
              return m(m.route.Link, { className: "nav-link mobile-nav-link", href: route.path }, [
                m(`i[data-lucide=${route.icon ?? "circle"}]`),
                m("span", route.title)
              ]);
            }
          })
        ]);
      } else {
        return m(".mobile-menu-section.mt-3", [
          m(".text-uppercase.small.fw-semibold.opacity-50.px-2.mb-1", item.title),
          m(m.route.Link, { className: "nav-link mobile-nav-link", href: item.path }, [
            m(`i[data-lucide=${item.icon ?? "circle"}]`),
            m("span", item.title)
          ])
        ]);
      }
    })
  );
};


export const getRoutes = () => {
  const routes = {}
  appRoutes.forEach( x => {
    if(x.type == 'group') {
      x.routes.forEach( y => {
        if(y.childRoutes) {
          y.childRoutes.forEach( z => {
            routes[z.path] = z.useWrapper ? useWrapper(z.component) : z.component                            
          })                    
        } else {
          routes[y.path] = y.useWrapper ? useWrapper(y.component) : y.component
        }                             
      })                            
    } else {
      routes[x.path] = x.useWrapper ? useWrapper(x.component) : x.component
    }                             
  })                           

  return routes
}

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
    }         
  }                              
}
