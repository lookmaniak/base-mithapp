import m from 'mithril'
import authService from '../services/auth_service'
import HttpException from '../../../../core/exceptions/HttpException';
import { disabled } from '../../../utils/helpers';
import TextField from '../../../components/TextField';
import { createIcons, Loader2, LogIn, Lock, Mail } from 'lucide';

const LoginPage = {
  view() {
    return m('.container', [
      m('.row', [
        m('.col.mx-auto.my-auto', m(LoginForm))
      ])                         
    ])         
  }                    
}

const LoginForm = {
  email: "",
  password: "",
  async handleLogin() {
    const res = await authService.login(this.email, this.password);
    if (res.success) m.route.set("/dashboard");
  },
  oncreate: () => { createIcons({ icons: { Loader2, LogIn, Lock, Mail }})},
  view() {
    return m(".d-flex.align-items-center.justify-content-center.min-vh-100", [

      // Outer container
      m(".card-custom", {
        style: `
          width: 100%;
          max-width: 420px;
          padding: 2rem 2.25rem;
          background: var(--card-bg);
        `
      }, [

        // Logo + Title
        m(".text-center.mb-4", [
          m("i[data-lucide='lock']", { style: "width:36px;height:36px;" }),
          m("h4.mt-2.mb-0.fw-bold", "Welcome Back"),
          m("div.text-muted.small", "Sign in to continue")
        ]),

        // EMAIL
        m(".mb-3", m(TextField, {
          label: "Email",
          exception: HttpException.email,
          oninput: e => this.email = e.target.value,
          onkeydown: e => {
            if(e.key == 'Enter') {
              this.handleLogin()                         
            }
          },
          icon: 'mail' 
        })),

        // PASSWORD
        m(".mb-3", m(TextField, {
          label: "Password",
          exception: HttpException.password,
          oninput: e => this.password = e.target.value,
          onkeydown: e => {
            if(e.key == 'Enter') {
              this.handleLogin()                                  
            }
          },
          type: "password",
          autocomplete: false,
          icon: 'lock'
        })),

        // SUBMIT BUTTON
        m(".d-grid.mt-4", [
          m("button.btn.btn-primary.btn-lg.fw-semibold", {
            disabled: disabled(authService.isProcessing()),
            onclick: async e => {
              e.preventDefault();

              await this.handleLogin()
            }
          }, authService.isProcessing()
            ?  [
                m("i[data-lucide=loader-2].me-2.spin"),
                "Loading..."
              ]
            : [
                m("i[data-lucide=log-in].me-2"),
                "Login"
              ]
          )
        ]),

        // FOOTER LINKS
        m(".text-center.mt-3", [
          m("a.text-decoration-none.small[href='#']", {
            style: "color: var(--bs-primary);"
          }, "Forgot password?")
        ])
      ])
    ]);
  }
} 
 
 export default LoginPage 
