import m from 'mithril'
import authService from '../../auth/services/auth_service'


const Profile = {
  view() {
    return m('div', [
      m('div', [
        m('h3', 'Name'),
        m('h3', authService.user().name)
      ])                  
    ])         
  }
}
export default Profile
