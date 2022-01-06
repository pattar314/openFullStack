
const middleware = (req, res, next) => {
  console.log(req.url)
  console.log(req.body)
  console.log(req.status)
  console.log('---')
  next()
}

module.exports = middleware