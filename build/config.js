const path = require('path')
const nodeExternals = require('webpack-node-externals')
const Components = require('./bin/get-components')()

let externals = {}

Object.keys(Components).forEach(key => {
  externals[`vine-ui/packages/${key}`] = `vine-ui/lib/${key}`
})

externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()]

exports.externals = externals

exports.alias = {
  '@': path.resolve(__dirname, '../src'),
  components: path.resolve(__dirname, '../src/components'),
  examples: path.resolve(__dirname, '../examples'),
  'vine-ui': path.resolve(__dirname, '../')
}

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
}

exports.jsexclude = /node_modules/
