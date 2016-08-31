const spawn = require('child_process').spawn
const ora = require('ora')
const which = require('which')

exports.cnpmInstall = function cnpmInstall (dep, flag = '-D') {
  try {
    which.sync('cnpm')
  } catch (e) {
    throw e
  }
  console.log('Cnpm detected!')
  const spinner = ora('Install dependencies')
  spinner.color = 'yellow'
  spinner.start()
  const cnpm = spawn('cnpm', ['install'].concat(dep).concat([flag]))
  cnpm.stdout.on('data', data => console.log(data.toString()))
  cnpm.stderr.on('data', data => console.log(data.toString()))
  cnpm.on('close', () => {
    spinner.text = 'Install finished!'
    spinner.succeed()
  })
}