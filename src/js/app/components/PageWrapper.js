import m from 'mithril'
import Navbar from '../components/Navbar'
import Sidebar, { MobileSidebar } from '../components/Sidebar'
import { createIcons, ChevronDown, Mail, Lock, SunMoon, Menu, User, LayoutDashboard, Users, Settings, Loader2, LogIn } from 'lucide'

const PageWrapper = {
  oncreate: () => createIcons({ icons: { ChevronDown, Mail, Lock, SunMoon, Menu, User, LayoutDashboard, Users, Settings, Loader2, LogIn }}),
  view: (vnode) => {
    return [
      m(Navbar),
      m(Sidebar),
      m(MobileSidebar),
      m('.content-wrapper', vnode.children ),
      m("button.btn.btn-primary.theme-toggle-btn",
        {
          onclick: () => {
            const root = document.documentElement;
            root.setAttribute(
              "data-bs-theme",
              root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark"
            );
          }
        },
        m("i[data-lucide=sun-moon]")
      )         
    ]              
  }                      
}


export default PageWrapper
