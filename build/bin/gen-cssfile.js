const fs = require('fs')
const path = require('path')

let Components = require('../../components.json')

Components = Object.keys(Components)
const basepath = path.resolve(__dirname, '../../src/styles/')

function fileExists(filePath) {
  try {
    return fs.statSync(filePath).isFile()
  } catch (err) {
    return false
  }
}

let indexContent = '@import "./base.scss";\n'

Components.forEach(key => {
  const fileName = key + '.scss'
  indexContent += '@import "./' + fileName + '";\n'
  const filePath = path.resolve(basepath, 'src', fileName)
  if (!fileExists(filePath)) {
    fs.writeFileSync(filePath, '', 'utf8')
    console.log('hsvui styles 创建遗漏的 ', fileName, ' 文件')
  }
  fs.writeFileSync(path.resolve(basepath, 'src', 'index.scss'), indexContent)
})
