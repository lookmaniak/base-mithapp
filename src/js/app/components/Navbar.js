import m from 'mithril'

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
                  m("li", m("a.dropdown-item[href=#]", "Profile")),
                  m("li", m("a.dropdown-item[href=#]", "Settings")),
                  m("li", m("hr.dropdown-divider")),
                  m("li", m("a.dropdown-item[href=#]", "Logout"))
                ]
              )
            ]
          )
        ]
      )
  }

export default Navbar
