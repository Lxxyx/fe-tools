const { cnpmInstall } = require('./../helper.js')
const path = require('path')
const cwd = process.cwd()
const fs = require('fs')
const prompt = require('prompt')

const packageJSON = path.resolve(cwd, 'package.json')

if (!fs.existsSync(packageJSON)) {
  throw new Error('当前目录下没有package.json，无法操作！')
}

const vue2Bundle = ['vue@next', 'vue-resource', 'vue-router@next', 'vuex@next']

prompt.start()

prompt.get(['sass'], (err, result) => {
  if (result.sass !== 'n') {
    vue2Bundle.push('sass-loader')
  }
  try {
    cnpmInstall(vue2Bundle, '-S')
  } catch (e) {
    console.log(e)
    console.log('You can run npm i to install new eslint devDependencies')
  }
})
