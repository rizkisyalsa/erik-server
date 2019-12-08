const moment = require('moment')

const info = (data) => {
  console.log(`${moment().format('MMMM Do YYYY, h:mm:ss')} : ${data}`)
}

module.exports = {
  info
}
