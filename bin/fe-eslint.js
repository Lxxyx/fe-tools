const fs = require('fs')
const path = require('path')
const cwd = process.cwd()
const { cnpmInstall } = require('./../helper.js')

const eslintrc = path.resolve(cwd, '.eslintrc.js')
const packageJSON = path.resolve(cwd, 'package.json')

if (!fs.existsSync(packageJSON)) {
  throw new Error('当前目录下没有package.json，无法操作！')
}

if (fs.existsSync(eslintrc)) {
  fs.unlinkSync(eslintrc)
}

const eslintConfig = 
`module.exports = {
  'extends': 'vue',
  'parser': 'babel-eslint'
}
`
console.log('Generate new .eslintrc at ' + cwd)

fs.writeFileSync(eslintrc, eslintConfig, 'utf-8')

try {
  cnpmInstall(['eslint', 'babel-eslint', 'eslint-config-vue'], '-D')
} catch (e) {
  console.log('You can run npm i to install new eslint devDependencies')
}
