import m from 'mithril'
import { getMobileSidebarMenu, getSidebarMenu } from '../router/router';
export const MobileSidebar = {
  oninit: ({ state }) => {
    state.menu = getMobileSidebarMenu()                               
  },
view: ({ state: { menu }}) =>
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
          m("h5.mb-0.fw-semibold", import.meta.env.APP_NAME)
        ]),
        m("button.btn-close[data-bs-dismiss='offcanvas']")
      ]),

      menu
    ])
};

const Sidebar = {
    oninit({ state }) {
      state.menu = getSidebarMenu()          
    },
    view: ({ state: { menu } }) => {
      return m("div.sidebar", menu )
    }
  }

export default Sidebar
