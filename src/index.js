// This file is auto gererated by build/bin/build-entry.js

import Collapse from '../packages/collapse'
import CollapsePanel from '../packages/collapse-panel'
import Countdown from '../packages/countdown'
import Rollnotice from '../packages/rollnotice'
import RollnoticeItem from '../packages/rollnotice-item'
import Sendcode from '../packages/sendcode'

const version = '0.0.1'

const components = [
  Collapse,
  CollapsePanel,
  Countdown,
  Rollnotice,
  RollnoticeItem,
  Sendcode
]

const install = (Vue, opts = {}) => {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  version,
  Collapse,
  CollapsePanel,
  Countdown,
  Rollnotice,
  RollnoticeItem,
  Sendcode
}
