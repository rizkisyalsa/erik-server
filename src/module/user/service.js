const bcrypt = require('bcryptjs')
const User = require('./repository')
const jwt = require("jsonwebtoken")
const config = require('../../core/configs')
const logger = require('../../core/logger')


const passwordIsMatch = async (username, password) => {
   try {
      let user = await User.getAuth(username)
      if (!user) {
         return {
            sts: 401,
            msg: 'Incorrect username or password'
         }
      }
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
         return {
            sts: 401,
            msg: 'Incorrect username or password'
         }
      }
      const payload = {
         user: {
            id: user.id
         }
      }
      const token = jwt.sign(payload, config.jwt.secret, { expiresIn: 360000 })
      return { sts: 200, token }

   } catch (err) {
      logger.info(err.message)
      return ({
         sts: 500,
         msg: 'Server Error'
      })
   }
}


const getLoggedIn = async (id) => {
   try {
      let user = await User.getUser(id)
      return { sts: 200, user }
   } catch (err) {
      logger.info(err.message)
      return ({
         sts: 500,
         msg: 'Server Error'
      })
   }
}


const createNewUser = async (createdId, username, password, name, role) => {
   try {
      let user =  await User.getUser(createdId)
      if(user.role !== 'admin') {
         return { sts: 401, msg: 'To create a user, please contact admin' }
      }

      let userExist =  await User.checkUsername(username)
      if(userExist) {
         return { sts: 400, msg: 'Username already exists' }
      }

      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)
      
      const result = await User.createUser(username, hashPassword, name, role)
      return { sts: 201, user: result }

   } catch (err) {
      logger.info(err.message)
      return ({
         sts: 500,
         msg: 'Server Error'
      })
   }
}


module.exports = {
   passwordIsMatch,
   getLoggedIn,
   createNewUser
};