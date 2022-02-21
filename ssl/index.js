const fs = require('fs')
const path = require('path')

module.exports = {
  key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
  cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
}
