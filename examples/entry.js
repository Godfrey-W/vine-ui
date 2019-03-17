import Vue from 'vue'
import VueRouter from 'vue-router'

import Vine from '@/index'
import App from './app'
import './icons'
import './assets/styles/index.scss'

import DemoBlock from './components/demo-block'
import DemoIcon from './components/demo-icon'

Vue.use(Vine)
Vue.use(VueRouter)

const demoComponents = [
  DemoBlock,
  DemoIcon
]
demoComponents.forEach(Comp => {
  Vue.component(Comp.name, Comp)
})

const routes = [
  {
    name: 'sendcode',
    path: '/sendcode',
    component: () => import('./docs/sendcode.md')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
