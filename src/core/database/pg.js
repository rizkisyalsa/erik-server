const { Pool } = require('pg')
const logger = require('../logger')

const {
   db: {
      host,
      port,
      user,
      password,
      database,
   }
} = require('../configs')

const pool = new Pool({
   user,
   host,
   database,
   password,
   port,
})

pool.query('SELECT NOW()')
   .then(res => {
      logger.info(`db ERIK connected`)
   })
   .catch(err => {
      logger.info(err.message)
   })

const dbCleanUp = () => {
   pool.end(() => {
      logger.info('pool db ERIK has ended')
   })
}

module.exports = {
   pool,
   dbCleanUp,
}