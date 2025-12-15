import m from 'mithril'

const UserMenu = {
  view({ attrs: { toggleUserMenu, closeUserMenu, userMenuOpen } }) {
    return m(".dropdown", [
      m("button.btn.btn-link.text-white.p-0.border-0.d-flex.align-items-center", {
        onclick: toggleUserMenu,
        "data-bs-toggle": "dropdown"
      }, [
        m("div.rounded-circle.bg-white.d-flex.align-items-center.justify-content-center[style=width:36px;height:36px]",
          m("i.bi.bi-person-fill.text-primary.fs-5")
        ),
        m("span.ms-2.d-none.d-md-inline", "Alex Johnson")
      ]),

      m("ul.dropdown-menu.dropdown-menu-end", { class: userMenuOpen ? "show" : "" }, [
        m("li",
          m("a.dropdown-item[href=#]", {
            onclick: e => { e.preventDefault(); closeUserMenu(); }
          }, [m("i.bi.bi-person.me-2"), "My Profile"])
        ),
        m("li",
          m("a.dropdown-item[href=#]", {
            onclick: e => { e.preventDefault(); closeUserMenu(); }
          }, [m("i.bi.bi-gear.me-2"), "Account Settings"])
        ),

        m("li", m("hr.dropdown-divider")),

        m("li",
          m("a.dropdown-item.text-danger[href=#]", {
            onclick: e => {
              e.preventDefault();
              closeUserMenu();
              // your logout logic...
            }
          }, [m("i.bi.bi-box-arrow-right.me-2"), "Log out"])
        )
      ])
    ]);
  }
};


export default UserMenu
