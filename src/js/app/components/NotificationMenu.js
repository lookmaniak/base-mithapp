import m from 'mithril'
 
 const NotificationMenu = {
  view({ attrs: { unread, notifications, markRead, markAllRead } }) {
    return m(".dropdown.me-3", [
      m("button.btn.btn-link.text-white.position-relative.p-0.border-0", {
        "data-bs-toggle": "dropdown"
      }, [
        m("i.bi.bi-bell-fill.fs-5"),
        unread > 0 && m("span.badge.bg-danger.position-absolute.top-0.start-100.translate-middle",
          unread
        )
      ]),

      m("ul.dropdown-menu.dropdown-menu-end.p-0[style=min-width:320px]", [
        m(".d-flex.justify-content-between.align-items-center.p-3.border-bottom", [
          m("h6.mb-0", "Notifications"),
          unread > 0 && m("button.btn.btn-sm.btn-outline-primary", {
            onclick: markAllRead
          }, "Mark all read")
        ]),

        m("div", { style: "max-height:300px;overflow-y:auto" },
          notifications.map(n =>
            m("a.dropdown-item.p-3.border-bottom.d-flex.align-items-start", {
              class: n.read ? "" : "bg-light",
              onclick: e => {
                e.preventDefault();
                markRead(n.id);
              }
            }, [
              m("i.bi.bi-info-circle-fill.text-primary.me-3.fs-5"),
              m(".flex-grow-1", [
                m("p.mb-1", n.text),
                m("small.text-muted", n.time)
              ]),
              !n.read && m("span.badge.bg-primary.ms-2", "New")
            ])
          )
        ),

        m(".text-center.p-2.border-top",
          m("a[href=#]", { onclick: e => e.preventDefault() }, "View all")
        )
      ])
    ]);
  }
};

export default NotificationMenu
