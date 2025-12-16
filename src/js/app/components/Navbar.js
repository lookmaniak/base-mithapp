import m from 'mithril'
import authService from '../features/auth/services/auth_service'

const Navbar = {
    view: () =>
      m(".app-navbar",
        [
          m("button.btn.btn-outline-primary.d-lg-none.me-3.p-2", {
            "data-bs-toggle": "offcanvas",
            "data-bs-target": "#mobileSidebar"
          }, m("i[data-lucide=menu]")),
          m("div.nav-brand", "Enterprise Dashboard"),
          m("ul.nav.ms-3.d-none.d-lg-flex",
            [
              m("li.nav-item.me-3", m("a.nav-link[href=#]", "Dashboard")),
              m("li.nav-item.me-3", m("a.nav-link[href=#]", "Projects")),
              m("li.nav-item.me-3", m("a.nav-link[href=#]", "Teams")),
            ]
          ),
          m("div.ms-auto.dropdown",
            [
              m("a.nav-link[href=#][data-bs-toggle=dropdown]",
                m("i[data-lucide=user]")),
              m("ul.dropdown-menu.dropdown-menu-end",
                [
                  m("li", m(m.route.Link, { href: "/profile", className: "dropdown-item"}, "Profile")),
                  m("li", m("a.dropdown-item[href=#]", "Settings")),
                  m("li", m("hr.dropdown-divider")),
                  m("li", m(m.route.Link, {
                  href: '/logout',
                  class: 'dropdown-item',
                  onclick: async e => {
                    e.preventDefault()
                    const req = await authService.logout()
                    if(req.success) {
                      m.route.set("/login")                 
                    }
                   }
                 }, authService.isProcessing() ? "Please wait..." : "Logout"))
                ]
              )
            ]
          )
        ]
      )
  }

export default Navbar
