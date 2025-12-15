import m from 'mithril'
export const MobileSidebar = {
  view: () =>
    m(".offcanvas.offcanvas-start.mobile-sidebar", {
      id: "mobileSidebar",
      tabindex: "-1"
    }, [

      /* HEADER */
      m(".offcanvas-header.border-bottom", {
        style: `
          background: var(--navbar-bg);
          color: var(--navbar-color);
        `
      }, [
        m(".d-flex.align-items-center.gap-2", [
          m("i[data-lucide='layout-dashboard']"),
          m("h5.mb-0.fw-semibold", "MyApp")
        ]),
        m("button.btn-close[data-bs-dismiss='offcanvas']")
      ]),

      /* BODY */
      m(".offcanvas-body.p-2", [

        /* SECTION */
        m(".mobile-menu-section", [
          m(".text-uppercase.small.fw-semibold.opacity-50.px-2.mb-1", "Dashboard"),

          m("a.nav-link.mobile-nav-link.active[href='#']", [
            m("i[data-lucide='home']"),
            m("span", "Overview")
          ])
        ]),

        /* SECTION */
        m(".mobile-menu-section.mt-3", [
          m(".text-uppercase.small.fw-semibold.opacity-50.px-2.mb-1", "Management"),

          /* USERS COLLAPSE */
          m("a.nav-link.mobile-nav-link[data-bs-toggle='collapse'][href='#m-users']", [
            m("i[data-lucide='users']"),
            m("span.flex-grow-1", "Users"),
            m("i[data-lucide='chevron-down']")
          ]),

          m(".collapse#m-users.ps-4", [
            m("a.nav-link.mobile-sub-link[href='#']", "User List"),
            m("a.nav-link.mobile-sub-link[href='#']", "Roles & Permissions")
          ]),

          m("a.nav-link.mobile-nav-link[href='#']", [
            m("i[data-lucide='settings']"),
            m("span", "Settings")
          ])
        ])
      ])
    ])
};

const Sidebar = {
    view: () =>
      m("div.sidebar",
        [
          m("div.sidebar-section-label", "Overview"),
          m("a.nav-link[href=#]",
            [m("i[data-lucide=layout-dashboard]"), " Home"]),

          m("div.sidebar-section-label", "Management"),
          m("a.nav-link[data-bs-toggle=collapse][href=#mgmt-users]",
            [m("i[data-lucide=users]"), " Users"]),
          m(".collapse#mgmt-users",
            m("ul.nav.flex-column.ms-4.mb-2",
              [
                m("li", m("a.nav-link[href=#]", "User List")),
                m("li", m("a.nav-link[href=#]", "Roles & Permissions")),
              ]
            )
          ),

          m("a.nav-link[href=#]",
            [m("i[data-lucide=settings]"), " Settings"]),
        ]
      )
  }

export default Sidebar
