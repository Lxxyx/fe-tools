#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const cwd = process.cwd()

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

const packageConfig = JSON.parse(fs.readFileSync(packageJSON, 'utf-8'))

if (!packageConfig.devDependencies) {
  packageConfig.devDependencies = {}
}

packageConfig.devDependencies['eslint'] = '*'
packageConfig.devDependencies['babel-eslint'] = '*'
packageConfig.devDependencies['eslint-config-vue'] = '*'

console.log('Insert new Eslint devDependencies at package.json')

fs.writeFile(packageJSON, JSON.stringify(packageConfig, null, 2), 'utf-8', err => {
  if (err) throw err
  console.log('Success!')
  console.log('You can run npm i to install new eslint devDependencies')
})
