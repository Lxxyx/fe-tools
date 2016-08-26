const exec = require('child_process').exec

exports.cnpmInstall = function () {
  console.log('Cnpm detected! Auto install dependencies.')
  exec('cnpm i', (err, stdout, stderr) => {
    if (err) throw err
    console.log(stdout)
    if (stderr) console.log(stderr)
  })
}
