const fs = require('fs')
const path = require('path')
const cwd = process.cwd()

const babelrc = path.resolve(cwd, '.babelrc')
const packageJSON = path.resolve(cwd, 'package.json')
const nodeVersion = Number(process.version.split('')[1])

if (!fs.existsSync(packageJSON)) {
  throw new Error('当前目录下没有package.json，无法操作！')
}

if (nodeVersion < 6) {
  throw new Error('需要Node6，你当前的Node版本：' + process.version)
}

if (fs.existsSync(babelrc)) {
  fs.unlinkSync(babelrc)
}

const babelConfig = {
  presets: ['es2017'],
  plugins: ['transform-es2015-modules-commonjs']
}

console.log('Generate new .babelrc at ' + cwd)

fs.writeFileSync(babelrc, JSON.stringify(babelConfig, null, 2), 'utf-8')

const packageConfig = JSON.parse(fs.readFileSync(packageJSON, 'utf-8'))

if (!packageConfig.dependencies) {
  packageConfig.dependencies = {}
}

for (const dep in packageConfig.dependencies) {
  if (dep.includes('babel') && dep !== 'babel-register') {
    delete packageConfig.dependencies[dep]
  }
}

packageConfig.dependencies['babel-preset-es2017'] = '*'
packageConfig.dependencies['babel-plugin-transform-es2015-modules-commonjs'] = '*'

console.log('Insert new Babel dependencies at package.json')

fs.writeFile(packageJSON, JSON.stringify(packageConfig, null, 2), 'utf-8', err => {
  if (err) throw err
  console.log('Success!')
  console.log('You can run npm i to install new babel dependencies')
})
