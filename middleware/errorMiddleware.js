const path = require('path')
function errorCatcher(err, req, res, next) {
  const error = {
    status: err.status || 500,
    message: err.message,
    timestamp: new Date().toISOString(),
  }
  if (err.name === 'traversalError') {
    error.status = 403
    error.message = 'Access denied'
  } else if (err.path) {
    const errPath = path.extname(err.path).toLowerCase()
    const allowedExtensions = [
      '.html',
      '.txt',
      '.json',
      '.img',
      '.png',
      '.jpeg',
      '.gif',
    ]
    if (errPath === '' || allowedExtensions.includes(errPath)) {
      error.status = 404
      error.message = 'Content not found'
    } else {
      error.status = 415
      error.message = 'Unsupported Media Type'
    }
  } else if (err.name === 'ValidationError' || err.name === 'CastError') {
    error.status = 400
  }
  res.json(error)
}
module.exports = errorCatcher
