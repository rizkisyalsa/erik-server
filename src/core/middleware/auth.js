const jwt = require('jsonwebtoken')
const config = require('../configs')

module.exports = function (req, res, next) {
   let token = ''

   // Get token from query
   if (req.query.key) {
      token = req.query.key
   }

   // Get token from header
   if (req.header('x-auth-token')) {
      token = req.header('x-auth-token')
   }

   // Check if not token
   if (!token) {
      return res.status(401).json({
         msg: 'No token, authorization denied'
      })
   }

   try {
      const decoded = jwt.verify(token, config.jwt.secret)
      req.user = decoded.user;
      next();
   } catch (err) {
      res.status(401).json({
         msg: 'Token is not valid'
      })
   }
}