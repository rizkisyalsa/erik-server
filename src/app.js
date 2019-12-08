require('dotenv').config()
const http = require('http')

const { registerTerminus } = require('./core/terminus')
const { createApp } = require('./server')
const logger = require('./core/logger')

const app = createApp()
const server = http.createServer(app)

registerTerminus(server)

server.listen(process.env.APP_PORT, () => {
  logger.info('Server up...')
  logger.info(`http://localhost:${process.env.APP_PORT}/`)
})