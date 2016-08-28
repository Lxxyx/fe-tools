const fs = require('fs')
const path = require('path')
const cwd = process.cwd()
const which = require('which')
const { cnpmInstall } = require('./../helper.js')

const packageJSON = path.resolve(cwd, 'package.json')

if (!fs.existsSync(packageJSON)) {
  throw new Error('当前目录下没有package.json，无法操作！')
}

const packageConfig = JSON.parse(fs.readFileSync(packageJSON, 'utf-8'))

if (!packageConfig.scripts) {
  packageConfig.scripts = {}
}

packageConfig.scripts['test'] = 'nyc ava | tap-diff'
packageConfig.scripts['cover'] = 'nyc report --reporter=lcov'

const test = path.resolve(cwd, 'test')
fs.mkdirSync(test)

if (packageConfig.main) {
  const code = `import test from 'ava'

test('', t => {
  t.pass()
})
`
  let main = path.basename(packageConfig.main)
  main = main.replace('.js', '')
  main = `${main}.test.js`
  fs.writeFileSync(path.resolve(test, main), code, 'utf-8')
}

fs.writeFile(packageJSON, JSON.stringify(packageConfig, null, 2), 'utf-8')

try {
  cnpmInstall(['ava', 'nyc', 'tap-diff', '-D'])
} catch (e) {
  console.log('You can run npm i to install new eslint devDependencies')
}

