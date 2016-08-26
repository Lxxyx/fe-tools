const fs = require('fs')
const path = require('path')
const cwd = process.cwd()

const packageJSON = path.resolve(cwd, 'package.json')

if (!fs.existsSync(packageJSON)) {
  throw new Error('当前目录下没有package.json，无法操作！')
}

const packageConfig = JSON.parse(fs.readFileSync(packageJSON, 'utf-8'))

if (!packageConfig.devDependencies) {
  packageConfig.devDependencies = {}
}

packageConfig.devDependencies['ava'] = '*'
packageConfig.devDependencies['nyc'] = '*'
packageConfig.devDependencies['tap-diff'] = '*'

console.log('Insert new ava devDependencies at package.json')

if (!packageConfig.scripts) {
  packageConfig.scripts = {}
}

packageConfig.scripts['test'] = 'nyc ava | tap-diff'
packageConfig.scripts['cover'] = 'nyc report --reporter=lcov'

fs.mkdirSync(path.resolve(cwd, 'test'))

console.log('Insert test scripts and code cover report at package.json')

fs.writeFile(packageJSON, JSON.stringify(packageConfig, null, 2), 'utf-8', err => {
  if (err) throw err
  console.log('Success!')
  console.log('You can run npm i to install new eslint devDependencies')
})
