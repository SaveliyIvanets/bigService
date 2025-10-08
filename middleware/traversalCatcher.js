const path = require('path')
function traversalError(req, res, next) {
  const contentPath = path.resolve('uploads', req.params.name)
  const baseDir = path.resolve('uploads')
  if (!contentPath.startsWith(baseDir)) {
    const error = new Error('Access denied')
    error.code = 403
    error.name = 'traversalError'
    next(error)
  }
  next()
}
module.exports = traversalError
