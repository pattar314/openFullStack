const jwt = require('jsonwebtoken')
const process = require('process')
require('dotenv').config()

const routeLogger = (req, res, next) => {
  console.log(req.url)
  console.log(req.body)
  console.log(req.status)
  console.log('---')
  next()
}

const extractToken = (req, res, next) => {
  const authorization = req.get('Authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer')){
    console.log('token authorization passed')
    req.token = authorization.substring(7)
  } else {
    console.log('no token provided')
  }
  next()
}

const extractUser = ( req, res, next) => {
  try{
    const token = req.get('Authorization').substring(7)
    if (!token){
      res.status(401).json({ error: 'User required' })
    }

    let decodedToken = jwt.verify(token, process.env.SECRET)
    console.log('decoded token: ', decodedToken)
    req.user = decodedToken.id
  } catch (err) {
    console.log('user authorization failed')
    res.status(401).json({ error: 'no authorization' })
  }
  next()
}

module.exports = { routeLogger, extractToken, extractUser }