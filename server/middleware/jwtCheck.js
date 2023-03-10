const jwt = require('jsonwebtoken')

const jwtMessages = require('../constants/jwt');
const TokensHandler = require('../utils/tokensHandler');

module.exports = async function (req, res, next) {

   try {
      if (!req.cookies?.token) {
         // console.log('access token missin')
         return res.status(401).json({ message: jwtMessages.needAuth })
      }

      const checkAccess = TokensHandler.validateAccessToken(req.cookies.token)

      if (checkAccess === jwtMessages.needAuth) {
         return res.status(401).json({ message: jwtMessages.needAuth })
      }

      if (checkAccess === jwtMessages.timeExpired) {
         console.log('update tok')
         const decoded = jwt.decode(req.cookies?.token)
         const email = decoded.email

         const jwtAccess = TokensHandler.generateAccessToken({ email })
         res.cookie('token', jwtAccess, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
      }

      const checkRefresh = await TokensHandler.validateRefreshToken(req.cookies?.token)

      if (checkRefresh === jwtMessages.needAuth) {
         console.log('refresh token missin')
         return res.status(401).json({ message: jwtMessages.needAuth })
      }

      next()
   } catch (error) {
      res.status(500).json({ message: jwtMessages.unexpected })
   }
}