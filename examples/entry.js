import Vue from 'vue'
import VueRouter from 'vue-router'
import Vine from '@/index'
import App from './app'
import './icons'
import 'vine-ui/packages/vine-theme/src/index.scss'
import './assets/styles/index.scss'

import DemoBlock from './components/demo-block'
import DemoDrawer from './components/demo-drawer'
import DemoIcon from './components/demo-icon'

Vue.use(Vine)
Vue.use(VueRouter)

function loadDoc(name) {
  return r => require.ensure([], () =>
    r(require(`./docs/zh-CN/${name}.md`)))
}

const demoComponents = [
  DemoBlock,
  DemoDrawer,
  DemoIcon
]
demoComponents.forEach(Comp => {
  Vue.component(Comp.name, Comp)
})

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: [
    {
      path: '/collapse',
      component: loadDoc('collapse')
    },
    {
      path: '/countdown',
      component: loadDoc('countdown')
    },
    {
      path: '/rollnotice',
      component: loadDoc('rollnotice')
    },
    {
      path: '/sendcode',
      component: loadDoc('sendcode')
    }
  ]
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
