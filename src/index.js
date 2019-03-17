import Sendcode from '../packages/sendcode'
import Drawer from '../packages/drawer'

const components = [
  Sendcode,
  Drawer
]

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ...components
}
