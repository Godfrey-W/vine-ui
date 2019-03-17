import Vue from 'vue'
import DemoIcon from '../components/demo-icon'
Vue.component('demo-icon', DemoIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('../assets/svg', false, /\.svg$/)
requireAll(req)
