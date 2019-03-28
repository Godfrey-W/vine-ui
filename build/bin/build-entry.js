const fs = require('fs-extra')
const path = require('path')
const uppercamelize = require('uppercamelcase')
const Components = require('./get-components')()
const version = require('../../package.json').version
const tips = '// This file is auto gererated by build/bin/build-entry.js'

function buildVineEntry () {
  const uninstallComponents = []

  const importList = Components.map(name => `import ${uppercamelize(name)} from '../packages/${name}'`)
  const exportList = Components.map(name => `${uppercamelize(name)}`)
  const intallList = exportList.filter(name => !~uninstallComponents.indexOf(uppercamelize(name)))
  const content = `${tips}

${importList.join('\n')}

const version = '${version}'

const components = [
  ${intallList.join(',\n  ')}
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
  ${exportList.join(',\n  ')}
}
`
  fs.writeFileSync(path.join(__dirname, '../../src/index.js'), content)
}

buildVineEntry()
