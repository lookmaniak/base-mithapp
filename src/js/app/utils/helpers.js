import m from 'mithril'
 
export function disabled(val) {
  return val ? 'disabled' : ''                                
}

export function Icon(icon) {
  return m('i', { 'lucide-data' : icon })                             
}
