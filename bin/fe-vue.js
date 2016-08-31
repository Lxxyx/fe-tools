const { cnpmInstall } = require('./../helper.js')
const path = require('path')
const cwd = process.cwd()
const fs = require('fs')
const prompt = require('prompt')

const packageJSON = path.resolve(cwd, 'package.json')

if (!fs.existsSync(packageJSON)) {
  throw new Error('当前目录下没有package.json，无法操作！')
}

const vueBundle = ['vue', 'vue-resource', 'vue-router', 'vuex']

prompt.start()

prompt.get(['sass'], (err, result) => {
  if (result.sass !== 'n') {
    vueBundle.push('sass-loader')
  }
  try {
    cnpmInstall(vueBundle, '-S')
  } catch (e) {
    console.log(e)
    console.log('You can run npm i to install new eslint devDependencies')
  }
})
